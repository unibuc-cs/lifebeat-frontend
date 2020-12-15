import { programsService } from '../_services';

const state = {
    all: {}
};


const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        programsService.getAll()
            .then(
                progs => commit('getAllSuccess', progs),
                error => commit('getAllFailure', error)
            );
    }
}

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, progs) {
        state.all = { items: progs };
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