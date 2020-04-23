<template>
        <v-card elevation="15" class="ma-auto" min-width="400" style="background:rgba(0, 0, 0, 0.7);">
            <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
                <v-icon color="white" class="mx-2">mdi-file-cog</v-icon>
                <v-toolbar-title class="white--text">Offers</v-toolbar-title>
              </v-toolbar>
            <v-card v-if="fetchProducts == null">
                <v-skeleton-loader  v-for="x in 2" :key="x"
                class="mx-auto"
                width="300"
                type="list-item-avatar, card">
                </v-skeleton-loader>
            </v-card>
            <v-card dark height="300" class="mx-auto" v-else-if="fetchProducts.length == 0">
                <CreateOffer class="mx-auto"/>
            </v-card>
            <v-row no-gutters v-else>
                <v-col xs=12 md=6 lg=4 v-for="(command, x) in fetchProducts" :key="x">
                    <OfferCards v-bind:Command="command"/>
                </v-col>
            </v-row>
        </v-card>
</template>

<script>
import OfferCards from './OfferCards'
import CreateOffer from './CreateOffer';

export default {
    components: {
        OfferCards,
        CreateOffer
    },
    mounted() {
        this.$store.dispatch("settings/fetchMyOffers")
    },
    data() {
        return {
            
        }
    },
    watch: {
    },
    methods: {

    },
    computed: {
      fetchProducts() {
        return this.$store.state.settings.myOffers
      },
    }
}
</script>