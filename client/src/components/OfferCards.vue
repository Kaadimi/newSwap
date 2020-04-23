<template>
  <v-container fluid fill-height>
    <v-card width="280" height="380" class="mx-auto">
    <v-list-item>
      <v-list-item-avatar >
        <v-avatar>
          <img :src="userAvatar(Command.avatar)" alt="">
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ Command.username }}</v-list-item-title>
        <v-list-item-subtitle>{{ TIME(Command.created)}}</v-list-item-subtitle>
      </v-list-item-content>
        <v-btn v-if="settingsPage" @click="deleteOffer(Command._id)" fab small color="red">
          <v-icon color="white">mdi-close-thick</v-icon>
        </v-btn>
        <v-btn v-else-if="!myCard(Command.username)" @click="dialog = true" color="blue" small fab>
          <span class="white--text">{{Command.offer}}</span>
        </v-btn>
    </v-list-item>

    <v-img :src="backgroundLogo(Command.game)" height="200" class="align-end">
      <v-card-title>
        <v-btn retain-focus-on-click color="black" style="cursor:default">
          <v-icon color="white" small>fas fa-globe</v-icon>
          <span class="ml-2 white--text">{{Command.serveur}}</span>
        </v-btn>
      </v-card-title>
    </v-img>

    <v-card-text>
      <v-list>
       <v-list-item>
          <v-list-item-avatar class="mx-0 px-0 ">
            <v-icon color="black">mdi-piggy-bank</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="subtitle-1">{{ Command.amount }} MK</v-list-item-content>
          <v-list-item-avatar class="mx-0 px-0 ">
            <v-icon color="black">mdi-currency-usd</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="subtitle-1">{{ Command.price }} DH</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <v-dialog v-model="dialog" width="450px">
    <SendMessage v-if="LoggedIn" :creator_id="Command.creator_id" :action="Command.offer" :username="Command.username" @SendMessage="dialog = false"/>
    <LoginForm v-else/>
  </v-dialog>
  </v-container>
</template>

<script>
import Moment from 'moment'
import SendMessage from './SendMessage'
import LoginForm from './LoginForm'

export default {
    components: {
      SendMessage,
      LoginForm
    },
    props: {
        Command: {
        type: Object
        }
    },
    data() {
      return {
        dialog: false,
        publicPath: process.env.BASE_URL
      }
    },
    watch: {
      offerSuccess: function() {
        if (this.$store.state.alert.type === 'success')
          this.dialog = false
      }
    },
    methods: {
        deleteOffer(offerId) {
          this.$store.dispatch("settings/deleteOffer", offerId)
        },
        backgroundLogo(game) {
          return this.publicPath + game + ".png"
        },
        userAvatar(avatar) {
          return this.publicPath +  avatar
        },
        TIME(time)
        {
            if (time)
                return Moment(time).format("YYYY-MM-DD HH:mm:ss");
        },
        myCard(cardOwner) {
          if (cardOwner === this.$store.state.authentication.user.username)
            return true;
          else return false;
      }
    },
    computed: {
      LoggedIn() {
        return this.$store.state.authentication.loggedIn;
      },
      settingsPage() {
        if (this.$route.name == "SettingsTab")
          return true;
        else return false;
      },
    }
}
</script>

<style scoped>
  .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .7;
  position: absolute;
  width: 100%;
  }

  .cardColor {
   background-color: rgba(255, 255, 255, 0) !important;
   border-color: white !important;
 }
</style>