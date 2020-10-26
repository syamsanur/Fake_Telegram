<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 border">

        <div class="row mt-3 p-3">
          <div class="col-lg-8 col-6">
            <h3 style="color: #7E98DF;">Telegram</h3>
          </div>
          <div class="col menuSmall">
            <div class="row">
              <div class="col-5">
                <button class="btn btn-outline-light">
                  <img src="../assets/icon/Search.png">
                </button>
              </div>
              <div class="col-5">
                <button class="btn btn-outline-light">
                  <img src="../assets/icon/Plus.png">
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-2 ">

            <b-dropdown variant="outline" right class="float-right" menu-class="dropmenu" no-caret>
               <template v-slot:button-content>
                <img src="../assets/icon/Menu.png">
              </template>
              <b-dropdown-item-button class="mt-2 mb-2" v-b-toggle.sideprofile>
                <b-icon icon="gear" class="mr-4"></b-icon>
                Setting
              </b-dropdown-item-button>
              <b-dropdown-item-button class="mt-2 mb-2" v-b-modal="'mapmodal'">
                  <b-icon icon="map" class="mr-4"></b-icon>
                Map
              </b-dropdown-item-button>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="person" class="mr-4"></b-icon>
                Contact
              </b-dropdown-item>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="telephone" class="mr-4"></b-icon>
                Call
              </b-dropdown-item>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="bookmark" class="mr-4"></b-icon>
                Save message
              </b-dropdown-item>
              <b-dropdown-item class="mt-2 mb-2">
                <b-icon icon="person-plus" flip-h class="mr-4"></b-icon>
                Invite friend
              </b-dropdown-item>
              <b-dropdown-item>
                <b-icon icon="question-circle" class="mr-4"></b-icon>
                FAQ
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item-button class="mt-2 mb-2 bg-danger" @click="onLogout">
                <b-icon icon="box-arrow-in-left" class="mr-4"></b-icon>
                Logout
              </b-dropdown-item-button>
            </b-dropdown>

            <!-- <button
              class="btn btn-outline-light float-lg-right float-right"
              v-b-toggle.dropmenu
              >
                <img src="../assets/icon/Menu.png">
              </button> -->

            <!-- <button
              class="btn btn-outline-light float-lg-right float-right"
              v-b-toggle.sideprofile
              >
              <img src="../assets/icon/Menu.png">
            </button> -->

          </div>
        </div>

        <div class="row p-3 menuBig">
          <div class="col-lg-10 col-10">
            <b-form-group>
              <b-form-input
                id="email-input"
                required
                placeholder="Enter email"
                type="email"
                size="sm"
              >
              </b-form-input>
          </b-form-group>
          </div>

          <div class="col-lg-2 col-2 ">
            <img src="../assets/icon/Plus.png" alt="">
          </div>
        </div>

        <div class="col-lg-12 col-12 mx-auto text-center">

          <div class="row">

            <div class="col">
              <b-button
                variant="outline"
                size="sm"
                block
                :class="{active: btnActive === 'btnAll'}"
                @click="btnActive = 'btnAll'"
                id="btnGroup"
              >All</b-button>
            </div>

            <div class="col">
              <b-button
              variant="outline"
              size="sm"
              block
              :class="{active: btnActive === 'btnImportant'}"
              @click="btnActive = 'btnImportant'"
              id="btnGroup"
            >Important</b-button>
            </div>

            <div class="col">
              <b-button
              variant="outline"
              size="sm"
              block
              :class="{active: btnActive === 'btnUnread'}"
              @click="btnActive = 'btnUnread'"
              id="btnGroup"
            >Unread</b-button>
            </div>

          </div>
          <div class="col mt-4  border" v-for="(item, index) in dataz" :key="index">
            <div class="row p-3" v-if="username !== item.fullname_users" @click="selectUser(item.fullname_users, item.image)">
              <div class="col-lg-4 col-4">
                <img class="photoProfile" :src="`${url}/${item.image}`">
              </div>
              <div class="col-lg-5 col-6 mt-2">
                <div class="col ">
                  <h6><b>{{item.fullname_users}}</b></h6>
                </div>
                <div class="col text-truncate">
                  <small>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil optio, eum tempore laudantium odio rerum nostrum ipsum iste atque blanditiis minima possimus in laborum eos qui numquam, consequuntur dolorum repellat.</small>
                </div>
              </div>
              <div class="col-lg-3 col-2 no-gutters">
                <div class="col">
                  <small>00:00</small>
                </div>
                <div class="col mt-2">
                  <b-btn size="sm" variant="light" class="btnNotif">99</b-btn>
                </div>
              </div>
            </div>
            <div class="row p-3 bg-success" v-else>
              <div class="col-lg-4 col-4">
                <img class="photoProfile" :src="`${url}/${item.image}`">
              </div>
              <div class="col-lg-8 col-8 mt-2">
                  <h6><b>{{item.fullname_users}}</b></h6>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-lg-9 p-3 chatContent" v-if="selectOn === false">
        <p>Chat woy</p>
      </div>

      <div class="col-lg-9 p-3 chatContent" v-else>

        <div class="row border-bottom mb-2">

          <div class="col-lg-1 mr-3 mb-2">
            <img class="photoHeader" :src="`${url}/${userRecImage}`">
          </div>
          <div class="col-lg-6 mt-3">
            <h6><b>{{userRecName}}</b></h6>
            <small>Online</small>
          </div>
          <div class="col-lg mt-3 text-right">
            <button class=" btn btn-outline-light mt-2 mb-2" v-b-toggle.sideprofilechat @click="sideBarChat">
              <img src="../assets/icon/Profilemenu.png" alt="">
            </button>
          </div>
        </div>

        {{historyMessages}} his
        <hr>
        {{privateMessages}} pri

      <div class="col" v-if="userRecName !== null">
        <div class="col" v-if="userRecName !== null">
          <div class="col p-3" v-for="(item, index) in historyMessages" :key="index">
            <div class="row p-3" v-if="item.sender === username">
              <div class="col-lg-2 align-self-end">
                <img class="photoHeader" :src="`${url}/${dataUser.image}`">
              </div>
              <div class="col-lg-10 bubble border">
                <p>{{item.message}}</p>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-lg-10 bubble">
                <p>{{item.message}}</p>
              </div>
              <div class="col-lg-2 align-self-end">
                <img class="photoHeader" :src="`${url}/${userRecImage}`">
              </div>
            </div>
          </div>
        </div>

        <div class="col" v-else >
          <div class="col p-3" v-for="(item, index) in privateMessages" :key="index">
            <div class="row p-3" v-if="item.sender === username">
              <div class="col-lg-2 align-self-end">
                <img class="photoHeader" :src="`${url}/${dataUser.image}`">
              </div>
              <div class="col-lg-10 bubble border">
                <p>{{item.message}}</p>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-lg-10 bubble">
                <p>{{item.message}}</p>
              </div>
              <div class="col-lg-2 align-self-end">
                <img class="photoHeader" :src="`${url}/${userRecImage}`">
              </div>
            </div>
          </div>
        </div>
      </div>
          <!-- <div class="col" v-for="(item, index) in privateMessages" :key="index">
            {{item}}
          </div> -->

        <!-- <div class="col p-4">
          <div class="row">
            <div class="col bubble">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo asperiores, at totam vitae quod earum accusantium voluptate natus minus praesentium et rerum veritatis cupiditate sapiente assumenda quaerat debitis. Porro, quas.</p>
            </div>
            <div class="col-lg-1 align-self-end">
              <img class="photoChat" src="../assets/profile.png">
            </div>
          </div>
        </div> -->

        <div class="row inputChat">
          <div class="col no-gutters">
            <form @submit.prevent="sendMessage()">
              <div class="input-group mt-2">
                <input type="text" v-model="message" class="form-control" placeholder="message">
                <div class="input-group-append">
                  <button class="btn btn-success" type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
    <!-- <google-maps class="map"
      :center="{
        lat: -6.893690,
        lng: 107.561057
      }"
      :zoom="12"
      ></google-maps> -->
    <sideProfile/>
    <sideProfileChat/>
    <MapModal/>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import io from 'socket.io-client'

import sideProfile from '../components/SideProfile'
import sideProfileChat from '../components/SideProfileChat'
import MapModal from '../components/MapModal'
// import * as VueGoogleMaps from 'vue2-google-maps'

const { url } = require('../helper/env')

export default {
  components: {
    sideProfile,
    MapModal,
    sideProfileChat
    // 'google-maps': VueGoogleMaps
  },
  data () {
    return {
      url: url,
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      btnActive: 'btnAll',
      socket: io('http://localhost:3000'),
      userRecName: null,
      userRecImage: null,
      message: '',
      listMessages: [],
      privateMessages: [],
      historyMessages: [],
      selectOn: false
    }
  },
  methods: {
    selectUser (user, image) {
      this.selectOn = true
      this.userRecName = user
      this.userRecImage = image
      this.getPrivateMessages()
      this.socket.emit('get-history-message', {
        sender: this.username,
        receiver: user
      })
      this.getHistory()
    },
    getHistory () {
      this.socket.on('history-list-message', (data) => {
        console.log(data)
        this.historyMessages = data
      })
    },
    sendMessage () {
      // alert('ok')
      if (this.userRecName === null) {
        alert('dafuq')
      } else {
        const msg = `${this.message}`
        this.listMessages = [...this.listMessages, {
          sender: this.username,
          receiver: this.userRecName,
          message: msg
        }]

        console.log(this.privateMessages)
        this.getPrivateMessages()
        console.log(this.privateMessages)
        // this.listMessages = [...this.privateMessages, msg]

        this.socket.emit('send-message', {
          sender: this.username,
          receiver: this.userRecName,
          message: this.message
        })
        // console.log(this.userRecName)
        this.message = ''
        this.getPrivateMessages()
      }
    },
    getPrivateMessages () {
      const privateMessage = this.listMessages.filter((item) => {
        if (this.userRecName === null) {
          return item.sender === this.userRecName || item.sender === this.username
        } else {
          return item.sender === this.userRecName || item.receiver === this.userRecName
        }
      })
      this.privateMessages = privateMessage
      // console.log(this.privateMessages)
    },
    onLogout () {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      window.location = '/'
    },
    getUser () {
      // console.log(this.id)
      this.onGetOneUser(this.id)
    },
    sideBarChat () {
      const fullname = this.userRecName
      // console.log(fullname)
      this.onGetUserChat(fullname)
    },
    ...mapActions({
      onGetAllUsers: 'sUsers/getAllUsers',
      onGetOneUser: 'sUsers/getOneUser',
      onGetUserChat: 'sUsers/getUserChat'
    })
  },
  computed: {
    ...mapGetters({
      dataAllUsers: 'sUsers/getAllUsers',
      dataUser: 'sUsers/getOneUser',
      dataz: 'sUsers/dataz'
    })
  },
  mounted () {
    this.onGetAllUsers()
    this.getUser()
    this.socket.emit('join-room', {
      user: this.username
    })
    this.socket.on('list-messages', (data) => {
      console.log(data)
      this.listMessages = [...this.listMessages, data]
    })
    // this.socket('history-list-message', (data) => {
    //   this.historyMessages = data
    // })
  }
}
</script>

<style scoped>

#btnGroup {
  border-radius: 20px;
}

.active{
  background-color:#7E98DF;
  color: white;
}

small {
  color: #7E98DF;
  overflow: hidden;
}

.btnNotif {
  border-radius: 50%;
  background-color: #7E98DF;
  color: white;
}

.photoProfile {
  width: 64px;
  height: 64px;
}
.chatCard {
  margin: 0 auto;
  padding: 0 auto;
}

.photoHeader {
  width: 64px;
  height: 64px;
}

.photoChat {
  width: 54px;
  height: 54px;
}

.bubble {
  background: #7E98DF;
  border-radius: 35px 35px 35px 10px;
}

.inputChat {
  /* height: 85vh; */
  bottom: 0px;
  position: fixed;
  width: 75%;
}

@media (min-width: 576px) {
  .menuSmall {
    display: none;
  }
}

@media (max-width: 576px) {
  /* .chatContent {
    display: none;
  } */
  .menuBig {
    display: none;
  }
}

</style>
