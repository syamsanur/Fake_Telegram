<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-12 border vh-100">

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
              <b-dropdown-item-button class="mt-2 mb-2" v-b-modal="'addfriend'">
                <b-icon icon="person-plus" flip-h class="mr-4"></b-icon>
                Add friend
              </b-dropdown-item-button>
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
                v-model="searchName"
                @keydown="searchUser"
              >
              </b-form-input>

              <!-- {{dataAllUsers}} -->
              <!-- {{dataFilter}} -->

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
          <div class="col col-lg mt-4  border" v-for="(item, index) in dataFriend" :key="index">
            <div class="row p-3" v-if="username !== item.fullname_users" @click="selectUser(item.fullname_users, item.image, item.friend2)">
              <div class="col-lg-4 col-4">
                <img class="photoProfile" :src="`${url}/${item.image}`">
              </div>
              <div class="col-lg-5 col-6 mt-2">
                <div class="col ">
                  <h6><b>{{item.fullname_users}}</b></h6>
                </div>
                <div class="col text-truncate">
                  <small>{{item.msg_preview}}</small>
                </div>
              </div>
              <div class="col-lg-3 col-2 no-gutters">
                <div class="col">
                  <small>{{item.msg_date}}</small>
                </div>
                <div class="col mt-2">
                  <b-btn size="sm" variant="light" class="btnNotif">{{item.msg_notif}}</b-btn>
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

      <!-- <div class="col mb-3 ml-3">
        1111
      </div> -->

      <div class="col-lg-9 col p-3 emptyChatContent" v-if="selectOn === false">
        <p class="text-center">Silahkan Pilih User</p>
      </div>

      <div class="col-lg-9 col-12 p-3 chatContent" v-else>

      <div class="col ml-4 mb-4 backSmall" @click="backSmall">
        <b-button size="lg" variant="outline">
          <img src="../assets/icon/back.png">
        </b-button>
      </div>

      <div class="col">
          <div class="row border-bottom mb-2">

            <div class="col-lg-1 col-2 mr-3 mb-2">
              <img class="photoHeader" :src="`${url}/${userRecImage}`">
            </div>
            <div class="col-lg-6 col-6 mt-3">
              <h6><b>{{userRecName}}</b></h6>
              <small>Online</small>
            </div>
            <div class="col-lg col mt-3 text-right">
              <button class=" btn btn-outline-light mt-2 mb-2" v-b-toggle.sideprofilechat @click="sideBarChat">
                <img src="../assets/icon/Profilemenu.png" alt="">
              </button>
            </div>
          </div>
      </div>

        <div class="col col-lg chatCol" v-if="userRecName !== null">
          <!-- {{historyMessages}} -->
          <div class="col col-lg p-3" v-for="(item, index) in historyMessages" :key="index">
            <!-- {{item.message}} -->
            <div class="row p-3" v-if="item.sender === username">
              <div class="col-lg-1 col-3 mr-lg-4  align-self-end">
                <img class="photoHeader" :src="`${url}/${dataUser.image}`">
              </div>
              <div class="col-lg-4 col-4 bubble">
                <div class="row">
                  <div class="col">
                    <h6 class="mt-3 text-white">{{item.message}}</h6>
                  </div>
                  <div class="col-lg-2 col-2 mr-2">
                    <b-dropdown variant="outline" class="float-right" right menu-class="dropmenu" no-caret>
                      <template v-slot:button-content>
                        <b-btn size="sm" variant="outline">
                          <b-icon icon="three-dots"></b-icon>
                        </b-btn>
                      </template>
                      <b-dropdown-item-button class="mt-2 mb-2" variant="danger" @click="deleteMessage(item)">
                        <b-icon icon="trash" class="mr-4"></b-icon>
                        Delete Message
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </div>
                </div>
              </div>
            </div>

            <div class="row" v-else>
              <div class="col-lg-4 offset-lg-6 col-4 offset-6 bubble">
                <div class="row">
                  <div class="col-lg-2 col-2">
                    <b-dropdown variant="outline" class="" menu-class="dropmenu" no-caret>
                      <template v-slot:button-content>
                        <b-btn size="sm" variant="outline">
                          <b-icon icon="three-dots"></b-icon>
                        </b-btn>
                      </template>
                      <b-dropdown-item-button class="mt-2 mb-2" variant="danger" @click="deleteMessage(item)">
                        <b-icon icon="trash" class="mr-4"></b-icon>
                        Delete Message
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </div>
                  <div class="col text-right">
                    <h6 class="mt-3 text-white">{{item.message}}</h6>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-2 align-self-end">
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
                <div class="row">
                  <div class="col">
                    <h6 class="mt-3 text-white">{{item.message}}</h6>
                  </div>
                  <div class="col-lg-2 mr-2">
                    <b-dropdown variant="outline" class="float-right" right menu-class="dropmenu" no-caret>
                      <template v-slot:button-content>
                        <b-btn size="sm" variant="outline">
                          <b-icon icon="three-dots"></b-icon>
                        </b-btn>
                      </template>
                      <b-dropdown-item-button class="mt-2 mb-2" variant="danger" @click="deleteMessage(item)">
                        <b-icon icon="trash" class="mr-4"></b-icon>
                        Delete Message
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-lg-10 bubble">
                <div class="row">
                  <div class="col-lg-2">
                    <b-dropdown variant="outline" class="" menu-class="dropmenu" no-caret>
                      <template v-slot:button-content>
                        <b-btn size="sm" variant="outline">
                          <b-icon icon="three-dots"></b-icon>
                        </b-btn>
                      </template>
                      <b-dropdown-item-button class="mt-2 mb-2" variant="danger" @click="deleteMessage(item)">
                        <b-icon icon="trash" class="mr-4"></b-icon>
                        Delete Message
                      </b-dropdown-item-button>
                    </b-dropdown>
                  </div>
                  <div class="col text-right">
                    <h6 class="mt-3 text-white">{{item.message}}</h6>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 align-self-end">
                <img class="photoHeader" :src="`${url}/${userRecImage}`">
              </div>
            </div>
          </div>
        </div>

        <div class="row inputChat">
          <div class="col-lg-9 col-12 no-gutters">
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
    <sideProfile />
    <sideProfileChat/>
    <MapModal/>
    <AddFriendModal @updateFriend="updateGetters"/>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import io from 'socket.io-client'

import sideProfile from '../components/SideProfile'
import sideProfileChat from '../components/SideProfileChat'
import MapModal from '../components/MapModal'
import AddFriendModal from '../components/AddFriendModal'
// import * as VueGoogleMaps from 'vue2-google-maps'

const { url } = require('../helper/env')

export default {
  components: {
    sideProfile,
    MapModal,
    AddFriendModal,
    sideProfileChat
    // 'google-maps': VueGoogleMaps
  },
  data () {
    return {
      url: url,
      id: localStorage.getItem('id'),
      username: localStorage.getItem('username'),
      btnActive: 'btnAll',
      searchName: '',
      socket: io('http://localhost:3000'),
      userRecName: null,
      userRecImage: null,
      userRecId: null,
      message: '',
      listMessages: [],
      privateMessages: [],
      historyMessages: [],
      selectOn: false,
      isMobile: false
    }
  },
  methods: {
    backSmall () {
      this.selectOn = false
    },
    async selectUser (user, image, idRec) {
      this.selectOn = true
      this.userRecName = user
      this.userRecImage = image
      this.userRecId = idRec
      console.log(this.userRecId)
      this.getPrivateMessages()
      await this.socket.emit('get-history-message', {
        sender: this.username,
        receiver: user,
        idSender: this.id,
        idRec: this.userRecId
      })
      this.getHistory()
      this.updateGetters()
    },
    getHistory () {
      this.socket.on('historyMsg', (data) => {
        // console.log(data)
        this.historyMessages = data
      })
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

        this.getPrivateMessages()

        this.socket.emit('send-message', {
          sender: this.username,
          receiver: this.userRecName,
          idSender: this.id,
          idRec: this.userRecId,
          message: this.message
        })
        // console.log(this.userRecName)
        this.message = ''
        console.log(this.listMessages)

        this.getHistory()

        this.updateGetters()
      }
    },
    deleteMessage (item) {
      const id = item.id_message
      if (item.sender !== this.username) {
        alert('Only Sender can delete message')
      } else {
        this.socket.emit('delete-message', id)
        alert('Delete message success')
        this.getHistory()
      }
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
    searchUser () {
      this.onSearchUser(this.searchName)
    },
    getFriend () {
      this.onGetAllFriend(this.id)
    },
    updateGetters () {
      this.onGetAllFriend(this.id)
    },
    sideBarChat () {
      const fullname = this.userRecName
      // console.log(fullname)
      this.onGetUserChat(fullname)
    },
    ...mapActions({
      onGetAllUsers: 'sUsers/getAllUsers',
      onGetOneUser: 'sUsers/getOneUser',
      onGetUserChat: 'sUsers/getUserChat',
      onSearchUser: 'sUsers/getUsersFilter',
      onGetAllFriend: 'friend/getAllFriend'
    })
  },
  computed: {
    ...mapGetters({
      dataAllUsers: 'sUsers/getAllUsers',
      dataUser: 'sUsers/getOneUser',
      dataz: 'sUsers/dataz',
      dataFilter: 'sUsers/getUsersFilter',
      dataFriend: 'friend/getAllFriend'
    })
  },
  mounted () {
    // this.onGetAllUsers()
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
    this.getFriend(this.id)
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
  background-size: cover;
  border-radius: 30px;
}
.chatCard {
  margin: 0 auto;
  padding: 0 auto;
}

.photoHeader {
  width: 64px;
  height: 64px;
  background-size: cover;
  border-radius: 30px;
}

.photoChat {
  width: 54px;
  height: 54px;
  background-size: cover;
  border-radius: 30px;
}

.bubble {
  background: #7E98DF;
  border-radius: 35px 35px 35px 10px;
  height: 50px;
}

.inputChat {
  bottom: 0px;
  position: fixed;
  width: 100%;
}

/* .chatCol {
  height: 100%;
  background-color: grey;
} */

@media (min-width: 576px) {
  .menuSmall {
    display: none;
  }
  .backSmall {
    display: none;
  }
}

@media (max-width: 576px) {
  .chatContent {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0px;
    /* z-index: -1; */
    background-color: white;
  }
  .menuBig {
    display: none;
  }
  .emptyChatContent {
    display: none;
  }
}

</style>
