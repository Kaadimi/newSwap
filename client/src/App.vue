<template>
  <v-app>
      <Swapbar v-if="this.$store.state.authentication.loggedIn" />
      <Navbar v-else/>
      <router-view />
      <Alert />
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
// import Browse from './components/Browse';
import Navbar from './components/Navbar';
import Alert from './components/Alerts'
import Swapbar from './components/Swapbar';

export default {
  name: 'App',

  components: {
     Navbar,
     Alert,
     Swapbar,
    // Browse,
  },

  data: () => ({
    //
  }),
};
</script>
