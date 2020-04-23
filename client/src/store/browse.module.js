import { userService } from '../services';

export const browse = {
    namespaced: true,
    state: {
        status: false,
        fetchData: false,
        products: [],
        filters: {
            Game: 'All',
            Serveur: 'All',
            Offer: 'All',
            Range: [1, 1000],
            Page: 0
        }
    },
    actions: {
        createOffer({ dispatch, commit }, productData) {
            commit('creationPending');

            userService.createOffer(productData)
            .then(
                product => {
                    commit('creationSuccess', product);
                    dispatch('settings/addMyOffer', product, {root: true})
                    dispatch('alert/success', "Offer was created successfully", { root: true });
                })
            .catch(error => {
                    commit('creationFailure');
                    dispatch('alert/error', error, { root: true });
            });
        },
        fetchProducts({ dispatch, commit, state }, page) {
            commit('dataPending', page);

            userService.fetchProducts(state.filters)
            .then(
                product => {
                    if (page > 0)
                        commit('pushProducts', product)
                    else
                        commit('dataFinished', product);
                })
            .catch(error => {
                    commit('dataFinished');
                    dispatch('alert/error', error, { root: true });
            });
        },
        sendMessage({ dispatch, commit}, message) {
            commit('creationPending');

            userService.sendMessage(message)
            .then(resp => {
                commit('creationFailure');
                dispatch('alert/success', resp, { root: true }); 
            })
            .catch(error => {
                commit('creationFailure');
                dispatch('alert/error', error, { root: true });
            });
        },
        removeFilters({commit}) {
            commit('removeFilters')
        },
        cookieFilters({ commit }, filters) {
            commit('cookieFilters', filters)
        },
        CGameType({ commit }, Game) {
            commit('CGameType', Game)
        },
        CServeurType({ commit }, Serveur) {
            commit('CServeurType', Serveur)
        },
        COfferType({ commit }, Offer) {
            commit('COfferType', Offer)
        },
        CRangeType({ commit }, Range) {
            commit('CRangeType', Range)
        },
    },
    mutations: {
        creationPending(state) {
            state.status = true;
        },
        creationSuccess(state, product) {
            state.status = false;
            state.products.push(product)
        },
        creationFailure(state) {
            state.status = false;
        },
        dataPending(state, page) {
            state.fetchData = true;
            state.filters.page = page;
        },
        dataFinished(state, product) {
            state.fetchData = false;
            state.products = product;
        },
        pushProducts(state, product) {
            state.fetchData = false,
            state.products.push(...product)
        },
        removeFilters(state) {
            state.filters = {
                Game: 'All',
                Serveur: 'All',
                Offer: 'All',
                Method: ['All'],
                Range: [1, 1000],
                Page: 0
            }
        },
        cookieFilters(state, filters) {
            state.filters = filters
        },
        CGameType(state, Game) {
            state.filters.Game =  Game;
        },
        CServeurType(state, Serveur) {
            state.filters.Serveur =  Serveur;
        },
        COfferType(state, Offer) {
            state.filters.Offer =  Offer;
        },
        CRangeType(state, Range) {
            state.filters.Range =  Range;
        },
    }
}