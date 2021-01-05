import { leaderboardService } from '../_services';

const state = {
    lead: {},
    leadFilter: {}
};


const actions = {
    getAll({ commit }, e) {
        
        if(e == undefined){
            leaderboardService.getStreakLeaderboard()
                .then(
                    lead => commit('getLeadSuccess', lead),
                    error => commit('getLeadFailure', error)
                );
            commit('getFilter', 'streak')
        }else{
            const filterLead = e.target.options[e.target.options.selectedIndex].value
            if(filterLead == 'streak'){
                leaderboardService.getStreakLeaderboard()
                .then(
                    lead => commit('getLeadSuccess', lead),
                    error => commit('getLeadFailure', error)
                );
                commit('getFilter', 'streak')
            }else{
                leaderboardService.getLevelLeaderboard()
                .then(
                    lead => commit('getLeadSuccess', lead),
                    error => commit('getLeadFailure', error)
                );
                commit('getFilter', 'level')
            }
        }
        
    }
}

const mutations = {
    getLeadSuccess(state, lead) {
        state.lead = lead
    },
    getLeadFailure(state, error) {
        console.log('error_lead')
        state.lead = { error };
    },
    getFilter(state, leadFilter){
        state.leadFilter = leadFilter;
    }
};

export const leaderboard = {
    namespaced: true,
    state,
    actions,
    mutations
};