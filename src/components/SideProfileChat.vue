<template>
  <div>
    <b-sidebar id="sideprofilechat" right width="350px" shadow no-header bg-variant="white" header-class="sidebarHeader">
      <div class="p-2">
        <div class="col sidebarHeader">
          <div class="row text-center mx-auto">

            <div class="col-1 col-lg-1" @click="hideSideMenu()">
              <b-button size="lg" variant="outline">
                <img src="../assets/icon/back.png">
              </b-button>
            </div>

            <div class="col-10 col-lg-10 mt-2" >
              <h5 class="text-center" style="color:#2675EC">{{dataUser.fullname_users}}</h5>
            </div>

          </div>
        </div>

        <div class="col">
          <div class="px-3 py-2 text-center mx-auto">
            <img class="photoProfile" :src="`${url}/${dataUser.image}`">
          </div>

          <div class="col text-center">
            <h6>{{dataUser.fullname_users}}</h6>
            <small class="smallText">@{{dataUser.fullname_users}}</small>
          </div>
        </div>

        <div class="col ">
          <h6><b>Account</b></h6>
          <p>{{dataUser.phone_users}}</p>
        </div>

        <hr>

        <div class="col ">
          <h6><b>@{{dataUser.fullname_users}}</b></h6>
          <small class="smallText">Username</small>
        </div>

        <hr>

        <div class="col ">
          <h6><b>{{dataUser.bio_users}}</b></h6>
          <small class="smallText">Bio</small>
        </div>

        <hr>

        <!-- <b-button v-b-toggle.settings variant="outline" block >
              <h6><b>Settings</b></h6>
              <b-icon icon="chevron-down"></b-icon>
              </b-button> -->

              <!-- <b-collapse id="settings" class="mt-2">
                <b-card>
                  <p class="card-text">Collapse contents Here</p>
                </b-card>
              </b-collapse> -->
      </div>
    </b-sidebar>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

const { url } = require('../helper/env')

export default {
  data () {
    return {
      url: url,
      disable: true
    }
  },
  methods: {
    hideSideMenu () {
      this.$root.$emit('bv::toggle::collapse', 'sideprofilechat')
    }
  },
  computed: {
    ...mapGetters({
      dataUser: 'sUsers/getUserChat'
    })
  },
  mounted () {
  }
}
</script>

<style scoped>

    /* .sidebarHeader {
    background-color: #7E98DF;
    color: white;
  } */

  .iconBack {
    color: white;
  }

  .photoProfile {
    width: 82px;
    height: 82px;
    background-size: cover;
    border-radius: 30px;
  }

  .smallText {
    color: #848484
  }
</style>
