<template>
<v-container fluid fill-height class="bg">
    <v-card v-if="!resetStatus" width="450px"
        elevation="15"
        class="ma-auto"
        dark style="background:rgba(0, 0, 0, 0.8);" >
    <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
        <v-icon color="white" class="mx-1">far fa-paper-plane</v-icon>
        <v-toolbar-title class="white--text">Send Email</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" ref="form" @submit="forgotPassword" onSubmit="return false;" lazy-validation class="mx-3 mt-4">
        <v-text-field
            outlined
            class="purple-input"
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
        />
        <v-btn
            type="submit"
            block
            class="ma-1 font-weight-light"
            color="blue"
            :disabled="!valid || !isEmpty"
            :loading="sendStatus"
        >
            <span class="white--text">SEND</span>
        </v-btn>
    </v-form>
    <v-btn @click="switchCardTrue" text color="blue lighten-3">
        Email recieved?
    </v-btn>
    </v-card>

    <v-card v-else width="450px"
        elevation="15"
        class="ma-auto"
        dark style="background:rgba(0, 0, 0, 0.8);">
    <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
        <v-icon color="white" class="mx-1">autorenew</v-icon>
        <v-toolbar-title class="white--text">Reset Password</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" ref="form" @submit="resetPassword" onSubmit="return false;" lazy-validation class="mx-3 mt-4">
        <v-text-field
            outlined
            class="purple-input"
            v-model="vkey"
            label="Verification Key"
            :rules="keyRules"
            required
        />
        <v-text-field
            outlined
            v-model="password"
            :rules="passwordRules"
            label="New Password"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            required
        />
        <v-btn
            type="submit"
            block
            class="ma-1 font-weight-light"
            color="blue"
            :disabled="!valid || !isEmpty_2"
            :loading="sendStatus"
        >
            <span class="white--text">reset</span>
        </v-btn>
    </v-form>
    <v-btn @click="switchCardFalse" text color="blue lighten-3">
        Resend Email
    </v-btn>
    </v-card>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            slider: false,
            valid: true,
            show: false,
            vkey: "",
            keyRules: [
                v => !!v || "Verification key is required",
            ],
            email: "",
            emailRules: [
                v => !!v || "Email is required",
                v => /^(?!.{254})(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
            ],
            password: "",
            passwordRules: [
                v => !!v || "Password is required",
                v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/.test(v) || 'Password requires 1 lower 1 upper case letter and 1 digit and between 5 and 20'
            ],
        }
    },
    methods: {
      forgotPassword()
      {
        this.$store.dispatch('resetPassword/forgotPassword', {email : this.email})
      },
      resetPassword()
      {
        this.$store.dispatch('resetPassword/resetPassword', {vkey: this.vkey, password: this.password});
      },
      switchCardFalse()
      {
          this.$store.dispatch('resetPassword/resetFailure')
      },
       switchCardTrue()
      {
          this.$store.dispatch('resetPassword/resetSuccessful')
      },
    },
    watch: {
        
    },
    computed: {
        resetStatus () {
            return this.$store.state.resetPassword.status;
        },
        isEmpty() {
            return this.email
        },
        isEmpty_2() {
            return this.password || this.vkey
        },
        sendStatus: function() {
            return this.$store.state.resetPassword.loading
        }
    }
}
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url( '../../public/zaap_empty.jpg') no-repeat center center;
    background-size: cover;
   /* transform: scale(1.1);*/
  }

</style>