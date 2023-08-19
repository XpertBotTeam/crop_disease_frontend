<script>
export default {
  name: "AppLogin",
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signInWithGoogle() {
      // Implement Google Sign-In logic here
    },
    login() {
      if (!this.validateForm()) {
        return; // Validation failed, do not proceed
      }

      // Continue with login logic
    },
    validateForm() {
      if (!this.email || !this.password) {
        alert('Please fill in all fields.');
        return false;
      }
      return true;
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
          <form @submit.prevent="login" class="card-body cardbody-color p-lg-5">
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="email@crop_disease"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Login
              </button>
            </div>

            <div class="text-center">
              <button
                @click="signInWithGoogle"
                class="btn btn-danger px-5 mb-2 w-100"
              >
                Sign in with Google
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


