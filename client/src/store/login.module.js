import { userService } from '../services';
import router from '../services/router';
import VueCookies from 'vue-cookies'

const token = localStorage.getItem('swap_token');
const user = JSON.parse(VueCookies.get('swapStore'))
const initialState = token && user
    ? { loggedIn: true, user: user, status: false}
    : { loggedIn: false, user: null, status: false}
export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { email, password }) {
            commit('loginRequest');

            userService.login(email, password)
                .then(
                    user => {
                        router.push('/browse');
                        commit('loginSuccess', user);
                        VueCookies.set('swapStore', JSON.stringify(user))
                    })
                .catch(error => {
                        commit('loginFailure');
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        userCookie({ commit }, userData) {
            commit("userCookie", userData)
        },
        logout({ commit }) {
            localStorage.removeItem('swap_token');
            VueCookies.delete("swapStore")
            router.push('/login')
            commit('logout');
        }
    },
    mutations: {
        userCookie(state, userData) {
            state.user = userData;
        },
        loginRequest(state) {
            state.loggedIn = true;
            state.status = true;
        },
        loginSuccess(state, user) {
            state.status = false;
            state.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status = false;
            state.loggedIn = false; 
        },
        logout(state) {
            state.loggedIn = false;
        }
    }
}