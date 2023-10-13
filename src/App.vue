<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue' 
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem("user-info") !== null;
    }
  }
}
</script>

<template>
  
  <AppHeader :isAuthenticated="isAuthenticated" />
  <router-view />
  <AppFooter  />
</template>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  background-image: url('./assets/backgroundimage.jpg'); 
  background-size: cover;
  background-position: center;
}

</style>
