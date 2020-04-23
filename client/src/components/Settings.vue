<template>
<v-container fluid fill-height>
    <v-row>
        <v-col xs=12 sm=3>
            <v-card dark>
                <v-list>
                    <v-list-item @click="profilePannel">
                        <v-list-item-avatar class="mx-0 px-0 ">
                            <v-icon>mdi-account-cog</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content class="subtitle-1">
                            General
                        </v-list-item-content>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item>
                    <v-list-item @click="passwordPannel">
                        <v-list-item-avatar class="mx-0 px-0 ">
                            <v-icon>mdi-shield-star</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content class="subtitle-1">Password</v-list-item-content>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item>
                    <v-list-item @click="offersPannel">
                        <v-list-item-avatar class="mx-0 px-0 ">
                            <v-icon>mdi-file-cog</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content class="subtitle-1">Offers</v-list-item-content>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
        <v-col xs=12 sm=9>
            <v-card>
                <ChangeOffers v-if="pannel == 3"/>
                <ChangePassword v-else-if="pannel == 2" />
                <ChangeProfile v-else/>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import ChangeProfile from './ChangeProfile'
import ChangePassword from './ChangePassword'
import ChangeOffers from './ChangeOffers'

export default {
    components: {
        ChangeProfile,
        ChangePassword,
        ChangeOffers
    },
    mounted() {
        if (this.$route.params.tab === 'offers')
            this.pannel = 3
        else if (this.$route.params.tab === 'password')
            this.pannel = 2
        else
            this.pannel = 1
    },
    data() {
        return {
            pannel: 1,
        }
    },
    methods: {
        profilePannel() {
            this.$router.push('/settings')
            this.pannel = 1
        },
        passwordPannel() {
            this.$router.push('/settings/password')
            this.pannel = 2
        },
        offersPannel() {
            this.$router.push('/settings/offers')
            this.pannel = 3
        }
    }
}
</script>

<style scoped>
  .container.fill-height {
    align-items: baseline !important;
  }
</style>