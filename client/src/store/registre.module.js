import { userService } from '../services';
import router from '../services/router';

export const registration = {
    namespaced: true,
    state: {
        status: false,
    },
    actions: {
        registre({ dispatch, commit }, userData) {
            commit('registrePending');

            userService.registre(userData)
                .then(
                    user => {
                        router.push('/login');
                        commit('registreFinished');
                        dispatch('alert/success', user, { root: true });
                    })
                .catch(error => {
                        commit('registreFinished');
                        dispatch('alert/error', error, { root: true });
                    }
                );
        },
    },
    mutations: {
        registrePending(state) {
            state.status = true;
        },
        registreFinished(state) {
            state.status = false;
        },
    }
}