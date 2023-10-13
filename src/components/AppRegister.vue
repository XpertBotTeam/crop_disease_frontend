<script>
import axios from 'axios';

export default {
  name: "AppRegister",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "", 
    };
  },
  methods: {
    async signup() {
      
      if (this.password !== this.confirmPassword) {
        
        this.errorMessage = "Passwords do not match.";
        return;
      }
      this.errorMessage = "";
      try {
        let result = await axios.post("https://cdim.xpertbotacademy.online/api/register", {
          name: this.username,
          email: this.email,
          password: this.password,
        });

        
        if (result.status === 200 & result.data.status === true) {
          alert("Registration successful. You can now log in.");
          this.$router.push("/login"); 
          
        
        } else {
          
          this.errorMessage = "Registration failed. Please check your information.";
        }
      } catch (error) {
        
        this.errorMessage = "An error occurred during registration.";
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5 background">Register Page</h2>
        <div class="card my-5">
          <form class="card-body cardbody-color p-lg-5" @submit.prevent="signup">
            <div class="mb-3">
              <input
                type="text" 
                v-model="username"
                class="form-control"
                id="username"
                placeholder="UserName"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                placeholder="email@crop_disease"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="confirmPassword"
                class="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            
            <div v-if="errorMessage" class="text-danger mb-3">
              {{ errorMessage }}
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Create account
              </button>
            </div>
            <div class="form-text text-center mb-5 text-dark">
              Registered?
              <router-link to="/login" class="text-dark fw-bold">
                Login to your Account
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>




