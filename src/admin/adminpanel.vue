<template>
    <div class="row">
        <div class="border border-dark bg-light col-5 users">
                <h3>Users from secure api end point:</h3>
                <em v-if="users.loading">Loading users...</em>
                <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                <ul v-if="users.items">
                    <li v-for="user in users.items" :key="user.id">
                        <div>{{user.email + ' ' + user.first_name + ' ' + user.last_name }}
                            <span class="admin" v-if="user.admin">Admin</span>
                            <span v-if="account.user.admin && !user.admin">      
                            <span v-if="user.deleting"><em> - Deleting...</em></span>
                            <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                            <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
                        </span>
                        </div> 
                        <div>Streak: {{ user.streakCount }}</div>
                        <div>{{ user.gender + ' ' + user.purpose + ' ' + user.height + 'cm' + ' ' + user.weight + 'kg  Age:' + user.age }} </div>
                        
                        
                    </li>
                </ul>
        </div>
        <div class="border border-dark bg-light col-5 ml-5 programs">
                <h3>Programs from secure api end point:</h3>
                <em v-if="users.loading">Loading programs...</em>
                <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
                <ul v-if="users.items">
                    <li v-for="prog in programs.items" :key="prog.program_id">
                        <div>{{prog.program_id + '. ' }}
                            <span class="font-weight-bold">{{ prog.name }}</span>
                            <span v-if="prog.deleting"><em> - Deleting...</em></span>
                            <span v-else-if="prog.deleteError" class="text-danger"> - ERROR: {{prog.deleteError}}</span>
                            <span v-else> - <a @click="deletePrograms(prog.program_id)" class="text-danger">Delete</a></span>
                        </div> 
                        <div>Purpose: {{ prog.purpose }}</div>
                        <div>Created by user: {{ prog.createdByUser[0]['email'] }}</div>
                    </li>
                </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "adminpanel",
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
            programs: state => state.programs.all
        })
    },
    created () {
        this.getAllUsers();
        this.getAllPrograms('admin');
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),
        ...mapActions('programs', {
            getAllPrograms: 'getAll',
            deleteProgram: 'deleteProgramById',
        }),
        deletePrograms(program_id, user_id){
                // console.log(program_id);
                // console.log( this.account.user.id);
                const details = {
                    'program_id': program_id,
                    'user_id': 'admin'
                }
                // console.log(details)
                this.deleteProgram(details);
        }
    }
};
</script>

<style scoped>
.admin {
    background: #51313126;
    border: 3px solid Teal;
    width: fit-content;
    margin: 2px;
}
</style>