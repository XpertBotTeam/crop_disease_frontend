<template>
  <footer class="footer">
   
    <p>&copy; XpertBot. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    logout() {
      localStorage.removeItem('user-info'); // Remove user info from local storage
      this.$router.push('/login'); // Redirect to the login page
    },
  },
}
</script>

<style scoped>
.footer {
  background-color: #5ab4f1; /* Sandy color */
  padding: 20px;
  text-align: center;
  color: #0b0e11;
}
</style>
