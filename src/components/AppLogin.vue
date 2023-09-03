<script>
import axios from 'axios';
export default {
  name: "AppLogin",
  data() {
    return {
      email: "",
      password: "",
      attemptsMsg: '',
    };
  },
  methods: {
    
    async login() {
     try{
      let response = await axios.post(
        "https://cdim.xpertbotacademy.online/api/login",
        {
          email:this.email,
          password: this.password,
          
        }
      );
      console.log(response);
      if(response.status == 200 && response.data.success === true){
        localStorage.setItem("user-info",JSON.stringify(response.success));
        this.$router.push("/");
      
      }
      else {
  
  alert( "Login failed. Please check your credentials.");
  this.$router.push("/login");
}
      console.log(response.success);
     }catch(error){
      console.log(error);
     }
    },

  },
};
</script>


<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login Page</h2>
        <div class="card my-5">
          <form @submit.prevent="login" method="post" class="card-body cardbody-color p-lg-5">
            <div class="errors">{{ attemptsMsg }}</div>
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
            
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Login
              </button>
            </div>

         
            <div class="form-text text-center mb-5 text-dark">
              Not Registered?
              <router-link to="/register" class="text-dark fw-bold">
                Create an Account
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


