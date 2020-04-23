<template>
  <div>
    <v-toolbar dark short dense>
      <v-toolbar-title class="toolbar">
         <v-btn to="/" class="title font-weight-light" text>
         <v-icon >mdi-swap-horizontal</v-icon> 
          <span class="grey--text">SWAP</span>
            <span>VALUE</span>
          </v-btn>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn to="/login" text>Login</v-btn>
        <v-btn to="/register" text>Register</v-btn>
        <v-divider vertical inset></v-divider>
      </v-toolbar-items>

    </v-toolbar>
  </div>
</template>

<script>
export default {
    name: 'Navbar',

    data() {
        return {
            
        }
    },
    methods: {
    }
}
</script>

<style scoped>
/* .toolbar{
   text-decoration:none;
     background:#fff;
     font-family: 'Orbitron';
     font-size: 20px !important;
     font-weight: bold
} */
</style>