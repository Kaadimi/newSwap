<template>
    <v-snackbar v-model="alert.snackbar" :timeout="5000" :color="alert.type" top class="mt-4">
        <v-icon color="white">error</v-icon>
        <span> {{alert.message}} </span>
        <v-btn color="white" text  @click="closeAlert">
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: 'alert',
    data() {
        return {
        }
    },
    methods: {
        closeAlert() {
            this.$store.dispatch('alert/clear');
        }
    },
    computed: {
        alert() {
            return this.$store.state.alert
        },
    },
    // watch:{
    //     $route (to, from){
    //        clear alert on location change
    //         this.closeAlert()
    //     }
    // } 
}
</script>