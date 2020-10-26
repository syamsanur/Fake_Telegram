<template>
  <div>
    <b-sidebar id="sideprofile" width="350px" shadow no-header bg-variant="white" header-class="sidebarHeader">
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

          <div class="col text-center mb-3 mt-3">
            <b-btn variant="outline-primary" size="sm" v-b-toggle.edit-img-collapse>
              <b-icon icon="pencil-fill"></b-icon> Edit Profile Picture
            </b-btn>
          </div>

          <b-collapse id="edit-img-collapse" class="mt-3 mb-3 border">
            <div class="col">
              <b-form enctype="multipart/form-data">
                  <input type="file" @change.prevent="processFile($event)">
                </b-form>
            </div>
          </b-collapse>

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

        <div class="col">
          <div class="col">
            <button class="btn btn-primary btn-block" v-b-modal="'editmodal'">Edit</button>
          </div>
        </div>

        <hr>

        <div class="col ">
          <div class="row">
            <div class="col mt-2">
              <h6><b>Settings</b></h6>
            </div>
            <div class="col">
              <b-button v-b-toggle.settings variant="outline" block >
                <b-icon icon="chevron-down"></b-icon>
              </b-button>

            </div>
          </div>
              <b-collapse id="settings" class="mt-2">
                <div class="col border">
                    <div class="row">
                      <div class="col-4">
                        <b-icon icon="bell"></b-icon>
                      </div>
                      <div class="col-8">
                        <small>Notification And Sound</small>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        <b-icon icon="lock"></b-icon>
                      </div>
                      <div class="col-8">
                        <small>Privacy And Security</small>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-4">
                        <b-icon icon="graph-up"></b-icon>
                      </div>
                      <div class="col-8">
                        <small>Data And Storage</small>
                      </div>
                    </div>
                </div>
              </b-collapse>
        </div>

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
      <ModalEdit/>
    </b-sidebar>
  </div>
</template>

<script>
import ModalEdit from './ModalEdit'

import { mapGetters, mapActions } from 'vuex'

const { url } = require('../helper/env')

export default {
  components: {
    ModalEdit
  },
  data () {
    return {
      id: localStorage.getItem('id'),
      url: url,
      disable: true,
      image: ''
    }
  },
  methods: {
    hideSideMenu () {
      this.$root.$emit('bv::toggle::collapse', 'sideprofile')
    },
    processFile (event) {
      this.image = event.target.files[0]
      const data = {
        id: localStorage.getItem('id'),
        image: this.image
      }
      this.updateImg(data)
        .then((response) => {
          if (response.data.message === 'Wrong image type') {
            alert('Wrong Image type')
          } else if (response.data.message === 'Image size is to big') {
            alert('Image size is to big')
          } else {
            alert(response.data.message)
            // console.log(this.id)
            this.onGetOneUser(this.id)
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      updateImg: 'sUsers/updateImage',
      onGetOneUser: 'sUsers/getOneUser'
    })
  },
  computed: {
    ...mapGetters({
      dataUser: 'sUsers/getOneUser'
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
