<template>
    <v-card width="450px"
        elevation="15"
        class="ma-auto"
        dark style="background:rgba(0, 0, 0, 0.8);">
    <v-toolbar flat height="50px" style="background:rgba(0, 0, 0, 0.5);">
        <v-icon color="white" class="mx-1">mdi-message</v-icon>
        <v-toolbar-title class="white--text"> {{ messageTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-form v-model="valid" ref="form" @submit="SendMessage" onSubmit="return false;" lazy-validation class="mx-3 mt-4">
        <v-text-field
            outlined
            class="purple-input"
            v-model="message"
            label="Message"
            :counter="255"
            required
        />
        <v-btn type="submit"  block class="ma-1 font-weight-light" color="blue" :loading="loading">
            <span class="white--text">Send Message</span>
        </v-btn>
    </v-form>
    </v-card>
</template>

<script>
export default {
    props: {
        username: {
            type: String
        },
        action: {
            type: String
        },
        creator_id: {
            type: String
        }
    },
    data() {
        return {
            valid: false,
            message: '',
        }
    },
    methods: {
        SendMessage() {
            this.$store.dispatch('browse/sendMessage', {message: this.message, creator_id: this.creator_id})
        }
    },
    computed: {
        messageTitle() {
            if (this.action === 'Buy') {
                return "Sell to " + this.username
            } else if (this.action === 'Sell') {
                return "Buy from " + this.username
            } else {
                return 'Send Message'
            }
        },
        loading() {
            return this.$store.state.browse.status
        }
    }
}
</script>