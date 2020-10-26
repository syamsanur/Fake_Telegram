<template>
  <div>
    <b-modal id="addfriend" title="Add Friend" hide-footer>
      <b-row>
        <b-col>
          <b-form-group>
              <b-form-input
                id="friend_input"
                placeholder="Enter fullname"
                type="text"
                v-model="searchName"
                @keydown="searchUser"
              >
              </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-col class="border p-3" v-if="dataFilter.length !== 0">
        <b-list-group v-for="(item, index) in dataFilter" :key="index">
          <b-list-group-item class="p-2 mt-2 mb-2">
            <b-row class="p-2">
              <b-col>
                <img class="photoChat" :src="`${url}/${item.image}`">
              </b-col>
              <b-col>
                <h6 class="mt-3">{{item.fullname_users}}</h6>
              </b-col>
              <b-col class="text-center">
                <b-btn variant="outline-primary" size="lg" @click="addFriend(item)">
                  <b-icon icon="person-plus"></b-icon>
                </b-btn>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col class="border text-center" v-else>
        <p class="mt-3">User not found</p>
      </b-col>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

const { url } = require('../helper/env')

export default {
  data () {
    return {
      id: localStorage.getItem('id'),
      url: url,
      searchName: ''
    }
  },
  methods: {
    searchUser () {
      this.onSearchUser(this.searchName)
    },
    addFriend (item) {
      const data = {
        idusers: parseInt(this.id),
        idfriend: item.id_users
      }
      // console.log(data)
      this.onInsertFriend(data)
        .then((response) => {
          alert(response.data.message)
          this.$bvModal.hide('addfriend')
          this.$emit('updateFriend')
        })
        .catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      onSearchUser: 'sUsers/getUsersFilter',
      onInsertFriend: 'friend/insertFriend'
    })
  },
  computed: {
    ...mapGetters({
      dataFilter: 'sUsers/datax'
    })
  },
  mounted () {
    this.onSearchUser(this.searchName)
  }
}
</script>

<style scoped>
.photoChat {
  width: 54px;
  height: 54px;
  background-size: cover;
  border-radius: 30px;
}
</style>
