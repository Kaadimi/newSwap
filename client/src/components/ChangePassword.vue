<template>
        <v-card elevation="15" class="ma-auto" min-width="400" dark style="background:rgba(0, 0, 0, 0.7);">
            <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
                <v-icon color="white" class="mx-2">mdi-shield-star</v-icon>
                <v-toolbar-title class="white--text">Password</v-toolbar-title>
              </v-toolbar>
              <v-form v-model="valid" ref="form" @submit="ChangePassword" onSubmit="return false;" lazy-validation class="mx-3 mt-4">
                <v-text-field
                  outlined
                  v-model="password"
                  :rules="passwordRules"
                  label="Current Password"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :counter="20"
                  required
                />
                <v-text-field
                  outlined
                  v-model="newPassword"
                  :rules="passwordRules"
                  label="New Password"
                  :type="showNew ? 'text' : 'password'"
                  @click:append="showNew = !showNew"
                  :append-icon="showNew ? 'visibility' : 'visibility_off'"
                  :counter="20"
                  required
                />
                <v-btn
                  block
                  :disabled="!valid || !isEmpty"
                  class="ma-1 font-weight-light"
                  color="blue lighteb-2"
                  type="submit"
                  :loading="loading"
                >
                  <span class="white--text">Change</span>
                </v-btn>
                </v-form>
        </v-card>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            show: false,
            showNew: false,
            password: '',
            newPassword: '',
            passwordRules: [
                v => !!v || "Password is required",
                v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/.test(v) || 'Password requires 1 lower 1 upper case letter and 1 digit and between 5 and 20'
            ],
        }
    },
    methods: {
      ChangePassword() {
        this.$store.dispatch('settings/changePassword', {password: this.password, newPassword: this.newPassword});
      }
    },
    computed: {
        isEmpty() {
            return this.password && this.newPassword
        },
        loading() {
          return this.$store.state.settings.status
        }
    }
}
</script>