<template>
  <div>
    <b-modal id="editmodal" title="Edit Profile" hide-footer>
      <b-form enctype="multipart/form-data">
        <b-form-group label-cols="4" label="Edit Username">
          <b-form-input
            v-model="edit.fullname_users"
            :fullname="edit.fullname_users"
          >
            {{edit.fullname_users}}
          </b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label="Edit Phone">
          <b-form-input
            v-model="edit.phone_users"
            :fullname="edit.phone_users"
          >
            {{edit.phone_users}}
          </b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label="Edit Bio">
          <b-form-textarea
            v-model="edit.bio_users"
            :fullname="edit.bio_users"
          >
          {{edit.bio_users}}
          </b-form-textarea>
        </b-form-group>

        <b-form-group label-cols="4" label="Edit Photo">
          <p>{{edit.image}}</p>
          <input class="upload" type="file" @change="processFile($event)"/>
        </b-form-group>

        <div class="col float-right">
          <div class="row">
            <div class="col">
              <b-btn variant="danger" block class="ml-2 mr-2" @click="$bvModal.hide('editmodal')">Cancel</b-btn>
            </div>
            <div class="col">
              <b-button type="submit" @click.prevent="sendData" variant="primary" block class="ml-2 mr-2">Submit</b-button>
            </div>
          </div>
        </div>

      </b-form>
    </b-modal>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      // edit: {}
    }
  },
  methods: {
    processFile (event) {
      this.image = event.target.files[0]
      // this.sendData()
    },
    sendData () {
      this.edit.newImage = this.image
      // console.log(this.bio_users)
      this.onUpdateData(this.edit)
        .then((response) => {
          alert(response)
          window.location.reload()
        })
        .catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      onUpdateData: 'sUsers/updateData'
    })
  },
  computed: {
    ...mapGetters({
      edit: 'sUsers/getOneUser'
    })
  }
}
</script>
