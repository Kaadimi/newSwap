<template>
  <div>
    <v-toolbar dense dark short>
      <v-toolbar-title class="toolbar">
         <v-btn to="/browse" class="title font-weight-light" text>
          <v-icon >mdi-swap-horizontal</v-icon>
          <span class="grey--text">SWAP</span>
            <span>VALUE</span>
          </v-btn>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-menu class="outline" offset-y transition="slide-y-transition">
            <template v-slot:activator="{ on }">
              <v-btn v-if="!user" v-on="on" text>
                <v-skeleton-loader 
                  type="avatar"
                ></v-skeleton-loader>
              </v-btn>
              <v-btn v-else v-on="on" text>
                <v-avatar>
                  <img :src="userAvatar(avatar)">
                </v-avatar>
                <span class="caption pr-2"> {{username}} </span>
                <v-icon x-small>fas fa-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
                <v-list-item>
                    <v-btn to="/settings" text >
                        <span class="caption">Settings</span>
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn @click="Logout" text >
                        <span class="caption">Logout</span>
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-divider vertical inset></v-divider>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<script>
export default {
    name: 'Swapbar',
    data() {
        return {
          publicPath: process.env.BASE_URL,
        }
    },
    methods: {
        userAvatar(avatar) {
          return this.publicPath + avatar
        },
        Logout() {
          this.$store.dispatch("authentication/logout")
        }
    },
    computed: {
      user() {
        return this.$store.state.authentication.user
      },
      username() {
        return this.$store.state.authentication.user.username
      },
      avatar() {
        return this.$store.state.authentication.user.avatar 
      }
    }
}
</script>

<style scoped>
.outline:focus{
    outline: none;
}
/* .toolbar{
   text-decoration:none;
     background:#fff;
     font-family: 'Orbitron';
     font-size: 20px !important;
     font-weight: bold
} */
</style>