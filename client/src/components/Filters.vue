<template>
  <v-container fluid fill-height class="text-xs-center">
     <v-dialog v-model="dialog" width="400" >
     <template v-slot:activator="{ on }">
        <v-btn  dark v-on="on" absolute right fab small>
          <v-icon color="blue lighten-3">mdi-cog</v-icon>
        </v-btn>
      </template>
        <v-card dark width="400" class="pa-5" style="background:rgba(0, 0, 0, 0.8);">
            <v-card-actions class="justify-center">
                <v-btn @click="applyFilters" small color="blue" class="mb-3">
                    <span>Apply Filters</span>
                </v-btn>
                <v-btn @click="removeFilters" small color="blue" class="mb-3">
                    <span>Remove Filters</span>
                </v-btn>
            </v-card-actions>
        <v-autocomplete
                prepend-icon="fas fa-gamepad"
                v-model="filters.Game"
                :items="Games"
                dense
                outlined
                color="blue-grey lighten-2"
                label="GAME"
                item-text="name"
                item-value="name"
                @change="CGameType"
                >
        </v-autocomplete>
        <v-autocomplete
                prepend-icon="fas fa-globe"
                v-model="filters.Serveur"
                :items="Servers"
                dense
                outlined
                color="blue-grey lighten-2"
                label="SERVER"
                @change="CServerType"
                >
        </v-autocomplete>
        <v-autocomplete
                prepend-icon="fas fa-search"
                v-model="filters.Offer"
                :items="Offers"
                dense
                outlined
                color="blue-grey lighten-2"
                label="OFFERS"
                @change="COfferType"
                class="mb-0 pb-0"
                >
        </v-autocomplete>
        <v-subheader>Amount slider</v-subheader>
        <v-range-slider
                v-model="filters.Range"
                :max="max"
                :min="min"
                hide-details
                class="align-center"
                @change="CAmountValue"
                width="300"
            >
                <template v-slot:prepend>
                <v-text-field
                    :value="filters.Range[0]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="CMinRange($event)"
                ></v-text-field>
                </template>
                <template v-slot:append>
                <v-text-field
                    :value="filters.Range[1]"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                    @change="CMaxRange($event)"
                ></v-text-field>
                </template>
            </v-range-slider>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
    beforeUpdate() {
        this.filters = this.$store.state.browse.filters
    },
    data() {
      return {
        dialog: false,
        filters: {
            Game: 'All',
            Serveur: 'All',
            Offer: 'All',
            Range: [1, 1000],
            Page: 0
        },
        Games: ["All", "Dofus", "Wakfu", "DofusTouch"],
        Servers: ["All", "Arty", "Algathe", "Droupik", "Hogmeiser", "Nabur", "Ayuto", "Bilby", "Clustus", "Issering", "Agride", "Atcham", "Brumen", "Eratz", "Echo", "Furye", "Henual", "Ilyzaelle", "Julith", "Jahash", "Mériana", "Merkator", "Nidas", "Ombre(Shadow)", "Oto Mustam", "Pandore", "Rubilax", "Ush"],
        Methods: ['All', 'Bank Transfer', 'Wafacash', 'Refill', 'Face To Face', 'Intermediate'],
        Offers: ['Sell', 'Buy', 'All'],
        min: 1,
        max: 1000,
      }
    },
    methods: {
        applyFilters() {
            this.$store.dispatch("browse/fetchProducts", this.$route.query.page)
            this.filters = this.$store.state.browse.filters 
            this.$cookies.set('swapFilters', JSON.stringify(this.$store.state.browse.filters), 1)
            this.dialog = false;
        },
        removeFilters() {
            this.$store.dispatch("browse/removeFilters")
            this.$store.dispatch("browse/fetchProducts", this.$route.query.page)
            this.dialog = false;
        },
        CGameType() {
            this.$store.dispatch("browse/CGameType", this.filters.Game)
        },
        CServerType() {
            this.$store.dispatch("browse/CServeurType", this.filters.Serveur)
        },
        COfferType() {
            this.$store.dispatch("browse/COfferType", this.filters.Offer)
        },
        CAmountValue() {
            this.$store.dispatch("browse/CRangeType", this.filters.Range)
        },
        CMaxRange(max) {
            if (max > this.filters.Range[0] && max <= 1000)
            {
                this.$set(this.filters.Range, 1, max)
                this.$store.dispatch("browse/CRangeType", this.filters.Range)
            }
        },
        CMinRange(min) {
            if (min < this.filters.Range[1] && min >= 1)
            {
                this.$set(this.filters.Range, 0, min)
                this.$store.dispatch("browse/CRangeType", this.filters.Range)
            }
        }
    },
}
</script>