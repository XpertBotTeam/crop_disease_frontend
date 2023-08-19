<script>
export default {
  name: "AppRegister",
};
</script>

<template>
   <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Register Page</h2>
        <div class="card my-5">
          <form class="card-body cardbody-color p-lg-5">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="UserName"
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="email@crop_disease"
              />
            </div>
            <div class="mb-3">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
              />
            </div>

            <div class="mb-3">
              <input
                type="Confirmpassword"
                class="form-control"
                id="Confirmpassword"
                placeholder="Confirm Password"
              />
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary px-5 mb-5 w-100">
                Create account
              </button>
            </div>
            <div class="form-text text-center mb-5 text-dark">
                Registered?
              <router-link to="/login" class="text-dark fw-bold">
                Login to your Account</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
 