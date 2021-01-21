import { programsService } from '../_services';

const state = {
    all: {},
    exercises: {}
};


const actions = {
    getAll({ commit }, purpose) {
        programsService.getAll(purpose)
            .then(
                progs => commit('getAllSuccess', progs),
                error => commit('getAllFailure', error)
            );
    },
    getAllExercises({ commit }){
        programsService.getAllExercises().then(
            exercises => commit('getAllExercisesSuccess', exercises)
        )
    },
    createProgram({ commit }, programDetails){
        programsService.createProgram(programDetails)
    }
}

const mutations = {
    getAllSuccess(state, progs) {
        state.all = { items: progs };
    },
    getAllFailure(state, error) {
        state.all = { error: 'error' };
    },
    getAllExercisesSuccess(state, exercs){
        state.exercises = { all: exercs };
    }
};

export const programs = {
    namespaced: true,
    state,
    actions,
    mutations
};