<template>
  <div class="card my-5">
    <div >
      <h1 >Upload Image</h1>
      
      <label for="file-upload" class="custom-file-upload, message"   :class="{ 'green-text': selectedImage }">
        
        {{ selectedImage ? 'Change Image' : 'Select Image' }}
        <input type="file" id="file-upload" @change="handleImageUpload" accept="image/*"  />
      </label>
      

      <div v-if="selectedImage">
        <h2>Selected Image:</h2>
        <img :src="selectedImage" alt="Selected" class="selected-image card my-1" /><br>
        <button @click="uploadImage">Upload</button>
      </div>
      <div v-else>
<p class="message">
  <span class="emoji">📷📁Upload a picture of a plant disease to get a solution. Supported formats: JPEG, PNG, JPG, or GIF.<br>
  🌍 Enable geolocation to get your city and country automatically.</span> 
</p>

      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedImage: null,
      uploadedFile: null,
      userLocation: null,
      userCity: null,
      userCountry: null,
    };
  },
  methods: {
    async handleImageUpload(event) {
      const file = event.target.files[0];

      if (file) {
        // Ensure the file is an image
        if (file.type.startsWith('image/')) {
          this.selectedImage = URL.createObjectURL(file);
          this.uploadedFile = file; // Store the selected file
        } else {
          alert('Please select a valid image file (JPEG, PNG, JPG, or GIF).');
        }
      } else {
        this.selectedImage = null;
      }

      // Get user's location
      this.getUserLocation();
    },
    async getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            this.userLocation = position;
            
            // Reverse geocoding to get city and country
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            
            try {
              const response = await axios.get(`https://geocode.xyz/${lat},${long}?json=1`);
              this.userCity = response.data.city;
              this.userCountry = response.data.country;
            } catch (error) {
              console.error('Error getting user location details:', error);
            }
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
    async uploadImage() {
      if (!this.uploadedFile) {
        alert('Please select an image to upload.');
        return;
      }

      if (!this.userLocation) {
        alert('Unable to determine user location. Please enable geolocation.');
        return;
      }

      
      
      const formData = new FormData();
      formData.append('image', this.uploadedFile); // Pass the selected file

      // Post user location to the location API
      try {
        await axios.post('https://cdim.xpertbotacademy.online/api/location', {
          name: `User Location in ${this.userCity}, ${this.userCountry}`,
          latitude: this.userLocation.coords.latitude,
          longitude: this.userLocation.coords.longitude,
        });
      } catch (error) {
        console.error('Error posting user location:', error);
      }

      // Post the image to the photo API
      try {
        const response = await axios.post('https://cdim.xpertbotacademy.online/api/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image upload response:', response.data);
        alert('Image upload succeeded.');
        this.selectedImage = null; 
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Image upload failed.');
      }
    },
  },
};
</script>


<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  height: 480px;
}

.selected-image {
  width: 80%;
  height: 90%;
  border-radius: 0;
}
.message {
  background-color: #e2f3e2; 
  border: 1px solid #4caf50;
  padding: 15px; 
  border-radius: 5px; 
  margin: 10px 0; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.message .emoji {
  font-size: 22px; 
  margin-right: 10px; 
}

.green-text {
  color: green;
}


</style>
