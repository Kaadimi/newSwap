export const alert = {
    namespaced: true,
    state: {
        snackbar: false,
        type: null,
        message: null
    },
    actions: {
        success({ commit }, message) {
            commit('success', message);
        },
        error({ commit }, message) {
            commit('error', message);
        },
        clear({ commit }) {
            commit('clear');
        }
    },
    mutations: {
        success(state, message) {
            state.snackbar = true,
            state.type = 'success';
            state.message = message;
        },
        error(state, message) {
            state.snackbar = true,
            state.type = 'error';
            state.message = message;
        },
        clear(state) {
            state.snackbar = false,
            state.type = null;
            state.message = null;
        }
    }
}