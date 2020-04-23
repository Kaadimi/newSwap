<template>
    <v-container fluid fill-height class="bg">
        <v-card width="450px"
              elevation="15"
              class="ma-auto"
              dark style="background:rgba(0, 0, 0, 0.7);">
            <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
                <v-icon color="white" class="mx-2">fas fa-user-plus</v-icon>
                <v-toolbar-title class="white--text">REGISTER</v-toolbar-title>
              </v-toolbar>
              <v-form v-model="valid" ref="form" @submit="registre" onSubmit="return false;" lazy-validation class="mx-3 mt-4">
                <v-text-field
                  outlined
                  class="purple-input"
                  v-model="userData.email"
                  :counter="255"
                  :rules="emailRules"
                  label="Email Address"
                  required
                />
                <v-text-field
                    outlined
                    class="purple-input"
                    v-model="userData.username"
                    label="Username"
                    :rules="usernameRules"
                    :counter="16"
                    required
                />
                <v-autocomplete
                      v-model="userAvatar"
                      :items="avatarChoices"
                      filled
                      chips
                      color="blue-grey lighten-2"
                      label="Avatar"
                      item-text="name"
                      item-value="name"
                      dense
                    >
                    <template v-slot:selection="data">
                        <v-chip
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          @click="data.select"
                        >
                          <v-avatar left>
                            <v-img :src="data.item.avatar"></v-img>
                          </v-avatar>
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                      <template v-slot:item="data">
                        <template v-if="typeof data.item !== 'object'">
                          <v-list-item-content v-text="data.item"></v-list-item-content>
                        </template>
                        <template v-else>
                          <v-list-item-avatar>
                            <img :src="data.item.avatar">
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </template>
                    </v-autocomplete>
                <v-card-actions>
                    <v-btn small color="blue" @click="gender = 0">
                        <v-icon>mdi-gender-male</v-icon>
                        <span>Male</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small color="pink" @click="gender = 1">
                        <v-icon>mdi-gender-female</v-icon>
                        <span>Female</span>
                    </v-btn>
                </v-card-actions>
                <v-text-field
                  outlined
                  v-model="userData.password"
                  :rules="passwordRules"
                  label="Password"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :counter="20"
                  required
                />
                <v-btn
                  block
                  :disabled="!valid || !isEmpty"
                  class="ma-1 font-weight-light"
                  color="blue lighteb-2"
                  type="submit"
                  :loading="SigningUp"
                >
                  <span class="white--text">Register</span>
                </v-btn>
                </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            show: false,
            userData : {
              username: '',
              avatar: '',
              email: "",
              password: "",
            },
            userAvatar: '',
            passwordRules: [
                v => !!v || "Password is required",
                v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{5,20}$/.test(v) || 'Password requires 1 lower 1 upper case letter and 1 digit and between 5 and 20'
            ],
            emailRules: [
                v => (!!v) || 'E-mail is required',
                v => /^(?!.{254})(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
            ],
            usernameRules: [
                v => !!v || "usernname is required",
                v => /^[a-zA-Z0-9_-]{3,16}$/.test(v) || "Username must only contain alphanumeric and -_- characheters"
            ],
            gender: 0,
            avatars: [
                //Male
                [{name: "sram" , avatar: "sramM.png"},
                {name: "iop" , avatar: "iopM.png"},
                {name: "cra" , avatar: "craM.png"},
                {name: "pandawa" , avatar: "pandawaM.png"},
                {name: "enutrof" , avatar: "enutrofM.png"},
                {name: "zobal" , avatar: "zobalM.png"},
                {name: "sacrier" , avatar: "sacrierM.png"},
                {name: "roublard" , avatar: "roublardM.png"},
                {name: "feca" , avatar: "fecaM.png"},
                {name: "eniripsa" , avatar: "eniripsaM.png"},
                {name: "ouginak" , avatar: "ouginakM.png"},
                {name: "steamer" , avatar: "steamerM.png"},
                {name: "xelor" , avatar: "xelorM.png"},
                {name: "sadida" , avatar: "sadidaM.png"},
                {name: "huppermage" , avatar: "huppermageM.png"},
                {name: "ecaflip" , avatar: "ecaflipM.png"},
                {name: "osamodas" , avatar: "osamodasM.png"}],
                // Female
                [{name: "sram" , avatar: "sramF.png"},
                {name: "iop" , avatar: "iopF.png"},
                {name: "cra" , avatar: "craF.png"},
                {name: "pandawa" , avatar: "pandawaF.png"},
                {name: "enutrof" , avatar: "enutrofF.png"},
                {name: "zobal" , avatar: "zobalF.png"},
                {name: "sacrier" , avatar: "sacrierF.png"},
                {name: "roublard" , avatar: "roublardF.png"},
                {name: "feca" , avatar: "fecaF.png"},
                {name: "eniripsa" , avatar: "eniripsaF.png"},
                {name: "ouginak" , avatar: "ouginakF.png"},
                {name: "steamer" , avatar: "steamerF.png"},
                {name: "xelor" , avatar: "xelorF.png"},
                {name: "sadida" , avatar: "sadidaF.png"},
                {name: "huppermage" , avatar: "huppermageF.png"},
                {name: "ecaflip" , avatar: "ecaflipF.png"},
                {name: "osamodas" , avatar: "osamodasF.png"}]
            ]
        }
    },
    methods: {
      registre() {
        this.userData.avatar = this.gender ? this.userAvatar + "M.png" : this.userAvatar + "F.png" 
        this.$store.dispatch('registration/registre', this.userData);
      },
      remove() {
        this.userData.avatar = '';
      }
    },
    computed: {
        isEmpty() {
            return this.userData.username && this.userAvatar
            && this.userData.email && this.userData.password
        },
        SigningUp () {
            return this.$store.state.registration.status;
       },
       avatarChoices() {
          return this.avatars[this.gender]
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