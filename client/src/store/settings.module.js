import { userService } from '../services';
import VueCookies from 'vue-cookies'

export const settings = {
    namespaced: true,
    state: {
        status: false,
        myOffers: []
    },
    actions: {
        changeProfile({ dispatch, commit }, userData) {
            commit('statusTrue');

            userService.changeProfile(userData)
                .then(
                    user => {
                        commit('statusFalse');
                        VueCookies.set('swapStore', JSON.stringify(userData), 1)
                        dispatch('alert/success', user, { root: true });
                    })
                .catch(error => {
                        if (error === "logout") {
                            dispatch('authentication/logout', error, {root: true})
                        } else {
                            commit('statusFalse');
                            dispatch('alert/error', error, { root: true });
                        }
                    }
                );
        },
        changePassword({ dispatch, commit }, userData) {
            commit('statusTrue');

            userService.changePassword(userData)
                .then(
                    user => {
                        commit('statusFalse');
                        dispatch('alert/success', user, { root: true });
                    })
                .catch(error => {
                        if (error === "logout") {
                            dispatch('authentication/logout', error, {root: true})
                        } else {
                            commit('statusFalse');
                            dispatch('alert/error', error, { root: true });
                        }
                    }
                );
        },
        fetchMyOffers({ dispatch, commit}) {
            commit('dataPending');

            userService.fetchMyOffers()
            .then(
                product => {
                    commit('dataFinished', product);
                })
            .catch(error => {
                    if (error === "logout") {
                        dispatch('authentication/logout', error, {root: true})
                    } else {
                        commit('dataFinished', null);
                        dispatch('alert/error', error, { root: true });
                    }
                }
            );
        },
        deleteOffer({ dispatch, commit}, offerId) {
            commit('dataPending');

            userService.deleteOffer(offerId)
            .then(
                product => {
                    dispatch('alert/success', product, { root: true });
                    commit('offerRemoved', offerId);
                })
            .catch(error => {
                    if (error === "logout") {
                        dispatch('authentication/logout', error, {root: true})
                    } else {
                        commit('statusFalse', null);
                        dispatch('alert/error', error, { root: true });
                    }
                }
            );
        },
        addMyOffer({commit}, offer) {
            commit('addMyOffer', offer)
        }
    },
    mutations: {
        addMyOffer(state, offer) {
            state.myOffers.push(offer)
        },
        statusFalse(state) {
            state.status = false;
        },
        statusTrue(state) {
            state.status = true;
        },
        dataPending(state) {
            state.status = true;
        },
        dataFinished(state, products) {
            state.status = false;
            state.myOffers = products;
        },
        offerRemoved(state, offerId) {
            state.status = false
            state.myOffers = state.myOffers.filter(function(item) {
                return item._id !== offerId
            })
        }
    }
}