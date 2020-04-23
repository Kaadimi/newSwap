<template>
    <v-container fluid fill-height class="bg">
      <LoginForm />
    </v-container>
</template>

<script>
import LoginForm from './LoginForm'
export default {
    components: {
      LoginForm
    },
}
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url( '../../public/zaap_full.jpg') no-repeat center center;
    background-size: cover;
   /* transform: scale(1.1);*/
  }

</style>