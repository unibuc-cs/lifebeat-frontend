import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { programs } from './programs.module';
import { details } from './details.module';
import { leaderboard } from './leaderboard.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        programs,
        details,
        leaderboard
    }
});
