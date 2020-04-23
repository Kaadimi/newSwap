import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './login.module';
import { registration } from './registre.module';
import { resetPassword } from './resetPassword.module';
import { browse } from './browse.module';
import { settings } from './settings.module'
// import { users } from './users.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        registration,
        resetPassword,
        browse,
        settings
        // users
    }
});