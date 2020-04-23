<template>
  <v-container fluid fill-height class="bg">
    <v-card class="cardColor" elevation="0" width="100%"  style="position:absolute;top:50%;left:0">
      <v-card elevation="0" width="400px" class="cardColor mx-auto">
        <v-card-actions>
          <v-btn to="/browse" dark x-large="" elevation="10" rounded="" style="background-color:#A9C6B0">
            
            <v-icon dark>mdi-magnify</v-icon>
            <span>Browse Offers</span>
           </v-btn>
          <v-spacer></v-spacer>
          <v-btn to="/login" x-large="" elevation="10" rounded="" style="background-color:#EDB675">
            <v-icon dark>mdi-plus</v-icon>
            <span>Create Offer</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      
    }),
  }
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url( '../../public/background_img.jpg') no-repeat center center;
    background-size: cover;
   /* transform: scale(1.1);*/
  }

  .cardColor {
   background-color: rgba(255, 255, 255, 0) !important;
   border-color: white !important;
 }
</style>
