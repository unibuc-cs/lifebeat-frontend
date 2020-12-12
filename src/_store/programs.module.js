import { programsService } from '../_services';

const state = {
    all: {}
};


const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        programsService.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    }
}

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    }
};

export const programs = {
    namespaced: true,
    state,
    actions,
    mutations
};