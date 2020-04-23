<template>
  <v-container fluid fill-height style="position:relative">
        <v-row v-if="!fetchProducts" no-gutters>
          <v-skeleton-loader v-for="x in 3" :key="x"
            class="mx-auto"
            width="300"
            type="list-item-avatar, card"
          ></v-skeleton-loader>
        </v-row>
        <v-row  v-else no-gutters>
            <Filters v-on:SelectionChange="UpdateSelection($event)" v-on:AmountChange="UpdateAmount($event)"/>
            <CreateOffer class="mx-auto"/>
            <v-col xs=12 sm=6 md=4 lg=3 v-for="(command, x) in fetchProducts" :key="x">
              <OfferCards v-bind:Command="command"/>
            </v-col>
        </v-row>
        <!-- <infinite-loading @infinite="infiniteHandler"></infinite-loading> -->
  </v-container>
</template>

<script>
import OfferCards from './OfferCards';
import Filters from './Filters';
import CreateOffer from './CreateOffer';
//import InfiniteLoading from 'vue-infinite-loading';

export default {
    inject: ['theme'],
    components: {
    OfferCards,
    Filters,
    CreateOffer,
//      InfiniteLoading,
    },
    created() {
       // window.addEventListener('beforeunload', this.saveFilters)
    },
    mounted() {
      let filters = this.$cookies.get('swapFilters')
      if (filters)
        this.$store.dispatch("browse/cookieFilters", JSON.parse(filters))
      this.$store.dispatch("browse/fetchProducts",  this.page)
    },
    data() {
      return {
        page: 0,
      }
    },
    methods: {
        saveFilters() {
            this.$cookie.set('swapFilters', JSON.stringify(this.$store.state.browse.filters), 1)
        },
        infiniteHandler() {
          console.log("im at the bottom")
          this.page++;
          this.$store.dispatch("browse/fetchProducts",  this.page)
        }
    },
    computed: {
      fetchProducts() {
        return this.$store.state.browse.products
      }
    }
}
</script>

<style scoped>
  .container.fill-height {
    align-items: baseline !important;
  }
</style>
