<template>
    <v-card width="450px"
        min-height="350px"
        elevation="15"
        class="ma-auto"
        dark style="background:rgba(0, 0, 0, 0.8);">
    <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
        <v-icon color="white" class="mx-1">lock_open</v-icon>
        <v-toolbar-title class="white--text">LOGIN</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" ref="form" @submit="login" onSubmit="return false;" lazy-validation class="mx-3 mt-4">
        <v-text-field
            outlined
            class="purple-input"
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
        />
        <v-text-field
            outlined
            v-model="password"
            :rules="passwordRules"
            label="Password"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            required
        />
        <v-btn type="submit" block class="ma-1 font-weight-light" color="blue" :disabled="!valid || !isEmpty" :loading="loading">
            <span class="white--text">Login</span>
        </v-btn>
        <v-checkbox
            v-model="checkbox"
            label="remembre me"
        ></v-checkbox>
    </v-form>
    <v-card-actions>
        <v-btn to="/forgotPassword" text color="blue lighten-3">
            Forgot password?
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn to="/register" text color="blue lighten-3">
            Register
        </v-btn>
    </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            show: false,
            checkbox: false,
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
      login()
      {
       this.$store.dispatch('authentication/login', { email: this.email, password: this.password });
      }
    },
    computed: {
      loggingIn () {
            return this.$store.state.authentication.loggingIn;
       },
       loading() {
           return this.$store.state.authentication.status
       },
       isEmpty() {
        return this.email && this.password;
      }
    }
}
</script>