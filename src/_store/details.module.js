import { detailsService } from '../_services';

const state = {
    prog: {},
    ex: {}
};


const actions = {
    getAll({ commit }, id) {
        console.log('actions')
        // console.log(detailsService.getAll(id))
        detailsService.getProgram(id)
            .then(
                prog => commit('getProgSuccess', prog),
                error => commit('getProgFailure', error)
            );
        
        detailsService.getExercises(id)
        .then(
            prog => commit('getExSuccess', prog),
            error => commit('getExFailure', error)
        );
        
    }
}

const mutations = {
    getProgSuccess(state, prog) {
        state.prog = prog
    },
    getProgFailure(state, error) {
        console.log('error')
        state.prog = { error };
    },
    getExSuccess(state, ex) {
        state.ex = ex
    },
    getExFailure(state, error) {
        console.log('error')
        state.ex = { error };
    }
};

export const details = {
    namespaced: true,
    state,
    actions,
    mutations
};