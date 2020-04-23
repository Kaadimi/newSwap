<template>
    <v-container fluid fill-height>
      <v-dialog v-model="dialog" width="450">
      <template v-slot:activator="{ on }">
        <v-btn class="mt-5" dark v-on="on" @click="checkStatus" small fab absolute right>
          <v-icon color="blue lighten-3">fas fa-plus</v-icon>
        </v-btn>
      </template>

      <v-card v-if="LoggedIn" dark style="background:rgba(0, 0, 0, 0.8);">
        <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
          <v-icon color="white" class="mx-1">mdi-cog</v-icon>
          <v-toolbar-title class="white--text">NEW OFFER</v-toolbar-title>
      </v-toolbar>
        <v-card-text class="px-3 pt-4 pb-0 mb-0">
            <v-autocomplete
                  prepend-icon="fas fa-gamepad"
                  v-model="Game"
                  :items="Games"
                  dense
                  outlined
                  color="blue-grey lighten-2"
                  label="GAME"
                  @change="CGameType"
                  >
          </v-autocomplete>
          <v-autocomplete
                prepend-icon="fas fa-globe"
                v-model="Serveur"
                :items="Servers"
                dense
                outlined
                color="blue-grey lighten-2"
                label="SERVER"
                >
        </v-autocomplete>
        <v-autocomplete
                prepend-icon="fas fa-exchange-alt"
                v-model="Offer"
                :items="Offers"
                dense
                outlined
                color="blue-grey lighten-2"
                label="OFFER"
                >
        </v-autocomplete>
        <v-row class="px-3">
            <v-col xs=6>
                <v-text-field append-icon="fas fa-briefcase" outlined v-model="Amount" :rules="AmountRules" label="Amount in MK" required class="purple-input"/>
            </v-col>
            <v-col xs=6>
                <v-text-field append-icon="fas fa-dollar-sign" outlined v-model="Price" :rules="PriceRules" label="DH/MK" required class="purple-input"/>
            </v-col>
        </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" @click="createOffer">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
      <LoginForm v-else/>
    </v-dialog>
    </v-container>
</template>

<script>
import LoginForm from './LoginForm'

export default {
    components: {
      LoginForm
    },
    data() {
        return {
            dialog: false,
            Game: 'Dofus',
            Games: ["Dofus", "Wakfu", "DofusTouch"],
            Serveur: 'Nabur',
            Servers: ["Arty", "Algathe", "Droupik", "Hogmeiser", "Nabur", "Ayuto", "Bilby", "Clustus", "Issering", "Agride", "Atcham", "Brumen", "Eratz", "Echo", "Furye", "Henual", "Ilyzaelle", "Julith", "Jahash", "Mériana", "Merkator", "Nidas", "Ombre(Shadow)", "Oto Mustam", "Pandore", "Rubilax", "Ush"],
            Offer: 'Sell',
            Offers: ['Sell', 'Buy'],
            Amount: 1,
            AmountRules: [
                v => !!v || 'Amount is required',
                v => (v && v > 0 && v <= 1000) || 'Amount must be between 1 and 1000'
            ],
            Price: 10,
            PriceRules: [
                v => !!v || 'Price is required',
                v => (v && v > 0 && v <= 1000) || 'Price must be between 1 and 1000'
            ],
        }
    },
    watch: {
      offerSuccess: function() {
        if (this.$store.state.alert.type === 'success')
          this.dialog = false
      }
    },
    methods: {
      createOffer() {
        this.$store.dispatch("browse/createOffer", {game: this.Game, serveur: this.Serveur,
        offer: this.Offer, amount: this.Amount, price: this.Price})
      },
      CGameType() {
        if (this.Game === 'Dofus')
          this.Servers = ["Arty", "Algathe", "Droupik", "Hogmeiser", "Nabur", "Ayuto", "Bilby", "Clustus", "Issering", "Agride", "Atcham", "Brumen", "Eratz", "Echo", "Furye", "Henual", "Ilyzaelle", "Julith", "Jahash", "Mériana", "Merkator", "Nidas", "Ombre(Shadow)", "Oto Mustam", "Pandore", "Rubilax", "Ush"] 
        else if (this.Game === 'Wakfu')
          this.Servers = ["Aerafal", "Amara", "Dathura", "Elbor", "Nox", "Remington"]
        else if (this.Game === 'DofusTouch')
          this.Servers = ["Brutas", "Dodge", "Grandapan", "Herdegrize", "Oshimo", "Terra Cogita"]
      },
      checkStatus() {

      }
    },
    computed: {
      LoggedIn() {
        return this.$store.state.authentication.loggedIn;
      },
      offerSuccess() {
        return this.$store.state.alert.snackbar
      }
    }
}
</script>