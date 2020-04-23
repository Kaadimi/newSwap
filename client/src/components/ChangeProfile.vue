<template>
        <v-card elevation="15" class="ma-auto" min-width="400" dark style="background:rgba(0, 0, 0, 0.7);">
            <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
                <v-icon color="white" class="mx-2">mdi-account-cog</v-icon>
                <v-toolbar-title class="white--text">General</v-toolbar-title>
            </v-toolbar>
            <v-form v-model="valid" ref="form" @submit="changeProfile" onSubmit="return false;" lazy-validation class="mx-3 mt-4">
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
                :counter="16"
                :rules="usernameRules"
                label="Username"
                required
            />
            <v-autocomplete
                v-bind:value="avatarName"
                v-on:input="setAndConvertValue($event)"
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
    mounted() {
        if (this.$store.state.authentication.user) {
            this.userData = this.$store.state.authentication.user
            if (this.userData.avatar.includes("F.png"))
                this.gender = 1
            //this.userData.avatar = this.userData.avatar.substring(0, this.userData.avatar.length - 5)
        }
    },
    data() {
        return {
            valid: true,
            show: false,
            userData : {
              username: '',
              email: '',
              avatar: ''
            },
            usernameRules: [
                v => !!v || "Username is required",
                v => /^[a-zA-Z0-9_-]{3,16}$/.test(v) || "Username must only contain alphanumeric and -_- characheters"
            ],
            emailRules: [
                v => (!!v) || 'E-mail is required',
                v => /^(?!.{254})(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
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
        changeProfile() {
            this.$store.dispatch('settings/changeProfile', this.userData);
        },
        remove() {
            this.userData.avatar = '';
        },
        setAndConvertValue(event) {
            this.userData.avatar = event + (this.gender ? "F.png" : "M.png")
        }
    },
    computed: {
        isEmpty() {
            return this.userData.avatar && this.userData.username 
            && this.userData.email
        },
       avatarChoices() {
          return this.avatars[this.gender]
       },
       avatarName() {
           return this.userData.avatar.substring(0, this.userData.avatar.length - 5)
       },
       loading() {
           return this.$store.state.settings.status
       }
    }
}
</script>