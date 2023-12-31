<template>
  <div class="search-container">
    <h1>{{ name }}</h1>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchInput"
        @input="handleSearch"
        placeholder="Search..."
        class="search-input"
      />
    </div>
  </div>

  <div class="card-container">
    <div
      v-for="disease in pagedDiseases"
      :key="disease.id"
      class="card"
      @mouseover="enlargeCard(disease)"
      @mouseout="shrinkCard(disease)"
    >
      <div class="card-content" :class="{ 'enlarged-card': disease.isEnlarged }">
        <div class="card-image">
          <h2>{{ disease.name }}</h2>
          
          <img
            v-if="disease.photos && disease.photos[0]"
            :src="disease.photos[0].image_url"
            alt="Disease Image"
            class="large-image"
          />
        </div>
        <!-- Show only first four lines of description -->
        <p class="description" :class="{ 'expanded': disease.showFullDescription }">
          {{ disease.description }}
        </p>
        <!-- Read More button to toggle description visibility -->
        <button @click="toggleDescription(disease)" :class="{'read-more-button': true, 'read-less-button': disease.showFullDescription}">
    {{ disease.showFullDescription ? 'Read Less' : 'Read More' }}
  </button>
      </div>
    </div>
  </div>

  <div class="pagination">
    <button
      v-if="currentPage > 1"
      @click="setPage(currentPage - 1)"
      class="pagination-button"
    >
      Previous
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="setPage(page)"
      :class="{ active: page === currentPage, 'pagination-button': true }"
    >
      {{ page }}
    </button>
    <button
      v-if="currentPage < totalPages"
      @click="setPage(currentPage + 1)"
      class="pagination-button"
    >
      Next
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppHome',
  data() {
    return {
      name: 'Disease Search',
      searchInput: '',
      diseases: [],
      currentPage: 1, 
      cardsPerPage: 4, 
    };
  },

  computed: {
    
    startIndex() {
      return (this.currentPage - 1) * this.cardsPerPage;
    },
    endIndex() {
      return this.currentPage * this.cardsPerPage;
    },

    // Filter diseases based on searchInput
    filteredDiseases() {
      const searchTerm = this.searchInput.toLowerCase();
      return this.diseases.filter((disease) => {
        return (
          disease.name.toLowerCase().includes(searchTerm) ||
          disease.description.toLowerCase().includes(searchTerm)
        );
      });
    },

    // Get the subset of filtered diseases for the current page
    pagedDiseases() {
      return this.filteredDiseases.slice(this.startIndex, this.endIndex);
    },

    // Calculate the total number of pages
    totalPages() {
      return Math.ceil(this.filteredDiseases.length / this.cardsPerPage);
    },
  },

  methods: {
    async handleSearch() {
      try {
        const response = await axios.get(
          'https://cdim.xpertbotacademy.online/api/diseases'
        );
        this.diseases = response.data.data;
        this.currentPage = 1; // Reset to the first page on search
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    },

    // Function to change the current page
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    enlargeCard(disease) {
      disease.isEnlarged = true;
    },

    shrinkCard(disease) {
      disease.isEnlarged = false;
    },
    toggleDescription(disease) {
      disease.showFullDescription = !disease.showFullDescription;
    },
  },

  mounted() {
    
    this.handleSearch();
  },
};
</script>

<style>
.search-container {
  text-align: center;
  padding: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  background-color: #F1F2F3;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  max-width: 490px;
  transition: transform 0.2s ease-in-out;
  position: relative;
}

.card:hover {
  transform: scale(1.05); 
}

.card h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.card p {
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: flex-end; 
  margin-top: 20px;
}

.pagination-button {
  background-color: #0056b3;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
}

.pagination-button:hover {
  background-color: #004595;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.card-content {
  background-color: #F1F2F3;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  max-width: 250px; 
  text-align: center;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  position: relative;
}

.card-content:hover {
  transform: scale(1.05); 
}

.large-image {
  width: 200px; 
  height: 200px; 
  object-fit: cover; 
  object-position: top left; 
  margin: 0 auto;
  border-radius: 5px; 
}
.description {
  max-height: 6.8em; 
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.6em;
}

.expanded {
  max-height: none; 
}

.read-more-button {
  background-color: #0056b3;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
}
.read-less-button {
  background-color: #ff0000; 
}
</style>
