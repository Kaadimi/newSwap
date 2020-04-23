import { userService } from '../services';
import router from '../services/router';

export const resetPassword = {
    namespaced: true,
    state: {
        status: false,
        loading: false,
    },
    actions: {
        forgotPassword({ dispatch, commit }, email) {
            commit('resetPending');

            userService.forgotPassword(email)
                .then(
                    resp => {
                        commit('resetSuccessful');
                        commit('switchTrue')
                        dispatch('alert/success', resp, { root: true });
                    })
                .catch(error => {
                        commit('resetFailure');
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        resetPassword({ dispatch, commit }, email) {
            commit('resetPending');

            userService.resetPassword(email)
                .then(
                    resp => {
                        commit('resetSuccessful')
                        router.push('/login');
                        dispatch('alert/success', resp, { root: true });
                    })
                .catch(error => {
                        commit('resetFailure')
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
        resetFailure({commit}) {
            commit('switchFalse');
        },
        resetSuccessful({commit}) {
            commit('switchTrue');
        },
    },
    mutations: {
        resetPending(state) {
            state.loading = true;
        },
        resetFailure(state) {
            state.loading = false;
        },
        resetSuccessful(state) {
            state.loading = false;
        },
        switchTrue(state) {
            state.status = true;
        },
        switchFalse(state) {
            state.status = false
        }
    }
}