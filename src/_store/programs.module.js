import { programsService } from '../_services';

const state = {
    all: {},
    exercises: {},
    byUser: {}
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
    },
    getProgramsCreatedByUser({ commit }, id){
        programsService.getAllCreatedByUser(id).then(
            progs => commit('getAllByUserSuccess', progs)
        );
    },
    filterPrograms({ commit }, e){
        const purpose = state.all.items[0]['purpose'];
        if(e.target.options[e.target.options.selectedIndex].value == 'B'){
            programsService.getAll(purpose)
            .then(
                progs => commit('getAllSuccess', progs),
                error => commit('getAllFailure', error)
            );
        } else if(e.target.options[e.target.options.selectedIndex].value == 'L'){
            console.log(purpose);
            programsService.getAll(purpose)
            .then(
                progs => commit('getAllSuccessLifeBeat', progs),
                error => commit('getAllFailure', error)
            );
        }else{
            console.log('U');
            programsService.getAll(purpose)
            .then(
                progs => commit('getAllSuccessUser', progs),
                error => commit('getAllFailure', error)
            );
        }
    },
    deleteProgramById({commit}, details){
        programsService.deleteProgram(details.program_id);
        if(details.user_id != 'admin'){
            programsService.getAllCreatedByUser(details.user_id).then(
                progs => commit('getAllByUserSuccess', progs)
            );
        }else{
            programsService.getAll('admin')
            .then(
                progs => commit('getAllSuccess', progs),
                error => commit('getAllFailure', error)
            );
        }
    }
}

const mutations = {
    getAllSuccess(state, progs) {
        // progs = progs.filter(prog => prog.createdByUser[0]['id'] != 18)   // imi da programele care nu sunt de la lifeBeat
        // progs = progs.filter(prog => prog.createdByUser[0]['id'] == 18)   // imi da programele de la LifeBeat
        state.all = { items: progs };
    },
    getAllSuccessLifeBeat(state, progs){
        progs = progs.filter(prog => prog.createdByUser[0]['id'] == 18) 
        state.all = { items: progs };
    },
    getAllSuccessUser(state, progs){
        progs = progs.filter(prog => prog.createdByUser[0]['id'] != 18) 
        state.all = { items: progs };
    },
    getAllFailure(state, error) {
        state.all = { error: 'error' };
    },
    getAllExercisesSuccess(state, exercs){
        state.exercises = { all: exercs };
    },
    getAllByUserSuccess(state, progs){
        state.byUser = { all: progs }
    }
};

export const programs = {
    namespaced: true,
    state,
    actions,
    mutations
};