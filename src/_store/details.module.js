import { detailsService } from '../_services';

const state = {
    all: {}
};


const actions = {
    getAll({ commit }, id) {
        detailsService.getAll(id)
            .then(
                prog => commit('getAllSuccess', prog),
                error => commit('getAllFailure', error)
            );
    }
}

const mutations = {
    getAllSuccess(state, prog) {
        state.all =  prog ;
    },
    getAllFailure(state, error) {
        state.all = { error };
    }
};

export const details = {
    namespaced: true,
    state,
    actions,
    mutations
};