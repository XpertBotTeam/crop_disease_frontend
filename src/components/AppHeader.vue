<script>
export default {
  name: "AppHeader",
};
</script>


<template>
  <nav class="navbar navbar-expand-lg app-header">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"> <img src="../assets/logo1.jpg" class="align-bottom w-8 h-8 rounded" style="object-fit: cover;"></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Upload image</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Discord</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">History</router-link>
          </li>
        </ul>
        <span class="navbar-text">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/login"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register"
                >Register</router-link
              >
            </li>
          </ul>
        </span>
      </div>
    </div>
  </nav>
  
</template>

<style >
img {
  width: 40px; 
  height: 40px; 
  object-fit: cover;
  border-radius: 50%; 
}
.app-header {
  background-color: #5ab4f1;
}
</style>
