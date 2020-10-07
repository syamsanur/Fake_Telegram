<template>
  <div class="container-fluid body-login">
    <div class="row d-flex justify-content-center p-5">
      <div class="col-lg-4 col-12 p-4 border form-login">
        <form @submit.prevent="onRegister()">
          <div class="row">
            <div class="col-lg-1 col-1">
              <router-link to="/">
                <img src="../assets/icon/back.png">
              </router-link>
            </div>
            <div class="col-lg-11 col-11">
              <h5 class="text-center" style="color: #7E98DF">Register</h5>
            </div>
          </div>
          <p class="text-left mt-4">Let's create your account!</p>

          <b-form-group>
            <b-form-text id="form-regis-fullname">
              Fullname
            </b-form-text>
            <b-form-input
              id="regis-input"
              required
              placeholder="Enter fullname"
              type="text"
              size="sm"
              v-model="form.fullname"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-text id="form-regis-email">
              Email
            </b-form-text>
            <b-form-input
              id="regis_email"
              required
              placeholder="Enter email"
              type="email"
              size="sm"
              v-model="form.email"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-form-text id="form-regis-password">
              Password
            </b-form-text>
            <b-form-input
              id="regis-password"
              required
              placeholder="Enter password"
              type="password"
              size="sm"
              v-model="form.password"
            ></b-form-input>
          </b-form-group>

        <div class="form-group text-center">
          <button type="submit" class="btn btn-block btn-outline-primary btn-login">Register</button>
        </div>

        </form>

        <div class="row">
          <div class="col-lg-4 col-4">
            <hr class="line">
          </div>
          <div class="col-lg-4 col-4 text-center mt-1">
            <p>Register with</p>
          </div>
          <div class="col-lg-4 col-4">
            <hr class="line">
          </div>
        </div>

        <div class="form-group text-center">
         <button class="btn btn-outline-primary btn-block btn-google">
         <img src="../assets/icon/google.png">
          Google
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        fullname: ''
      }
    }
  },
  methods: {
    onRegister () {
      this.actionRegister(this.form)
        .then((response) => {
          alert(response)
          window.location = '/'
        })
        .catch((err) => {
          alert(err)
        })
      // console.log(this.form)
      // window.location('/')
      // this.form.email = ''
      // this.form.password = ''
      // this.form.fullname = ''
    },
    ...mapActions({
      actionRegister: 'auth/register'
    })
  }
}
</script>

<style scoped>

  .body-login {
    background: #E5E5E5;
  }

  .form-login {
    background: #ffffff;
    box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
    border-radius: 30px;
    height: 90vh;
    text-align: left
  }

  input {
    border-radius: 0%;
    border: 0px;
    border-bottom: 2px rgba(210, 194, 255, 0.68) solid !important;
    margin: 10px 0px;
  }

  .btn-login {
    border-radius: 50px;
  }

  .btn-login:hover {
    background: #7E98DF;
  }

  .btn-google {
    border-radius: 50px;
    border: 2px solid #7E98DF;
  }
</style>
