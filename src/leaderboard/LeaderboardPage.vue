<template>
    <div>
        <navbar />
        <h1 class="text-center mt-4">Leaderboard</h1>
        <div>
            <select class="custom-select w-25 float-right mb-3 font-weight-bold" @change="getLeaderboardDetails($event)">
                <option value="streak">Streak</option>
                <option value="level">Level</option>
            </select>
        </div>
        <div>
            <div class="mt-5">
                <table class="table table-hover text-center">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col" v-if="filterUsed == 'streak'">Streak</th>
                    <th scope="col" v-else>Level</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in leaderboard" :key="user.id" :class="{ 'current-user': user.id == account.user.id}">
                    <th scope="row">
                        <icon v-if="index == 0" class="fa-gold" icon="crown" />
                        <icon v-else-if="index == 1" class="fa-silver" icon="crown" />
                        <icon v-else-if="index == 2" class="fa-bronze" icon="crown" />
                        {{ index + 1}}
                        <icon v-if="index == 0" class="fa-gold" icon="crown" />
                        <icon v-else-if="index == 1" class="fa-silver" icon="crown" />
                        <icon v-else-if="index == 2" class="fa-bronze" icon="crown" />

                    </th>
                    <td>{{ user.first_name + ' ' + user.last_name }}</td>
                    <td v-if="filterUsed == 'streak'">{{ user.streakCount }}</td>
                    <td v-else>{{ user.level }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import navbar from '../home/navbar.vue';

    export default {
        components: { navbar },
        computed: {
            ...mapState({
                account: state => state.account,
                leaderboard: state => state.leaderboard.lead,
                filterUsed: state => state.leaderboard.leadFilter
            })
        },
        created() {
            this.getLeaderboardDetails(undefined);
        },
        methods: {
            ...mapActions('leaderboard', {
                getLeaderboardDetails: 'getAll'
            })
        }
    };
</script>

<style scoped>
    .fa-gold{
        color: gold;
    }
    .fa-silver{
        color: silver;
    }
    .fa-bronze{
        color: chocolate;
    }
    .current-user{
        background: #93c3ca;
        font-weight: bold;
        /* color: white; */
    }
</style>