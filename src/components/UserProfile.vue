<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5 background">User Profile</h2>
        <div class="card my-5">
          <form class="card-body cardbody-color p-lg-5" @submit.prevent="changePassword">
            <div class="mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="currentPassword"
                class="form-control"
                id="currentPassword"
                placeholder="Current Password"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="newPassword"
                class="form-control"
                id="newPassword"
                placeholder="New Password"
                required
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                v-model="confirmNewPassword"
                class="form-control"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                required
              />
            </div>

            <div v-if="errorMessage" class="text-danger mb-3">
              {{ errorMessage }}
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Change Password
              </button>
            </div>
          
          </form>
          <div class="text-center">
            <button @click="logout" class="btn btn-danger px-5 mb-3">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserProfile',
  data() {
    return {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        this.errorMessage = "New passwords do not match.";
        return;
      }
      this.errorMessage = "";
      try {
        let result = await axios.post("https://cdim.xpertbotacademy.online/api/change-password", {
          email: this.email,
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        });

        if (result.status === 200 && result.data.status === true) {
          alert("Password changed successfully.");
          this.$router.push("/login");
        } else {
          this.errorMessage = "Password change failed. Please check your information.";
        }
      } catch (error) {
        this.errorMessage = "An error occurred while changing the password.";
        console.error(error);
      }
    },
    logout() {
      localStorage.removeItem('user-info'); 
      this.$router.push('/login');
    },
  },
};
</script>


