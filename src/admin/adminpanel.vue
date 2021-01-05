<template>
    <div class="border border-dark bg-light">
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
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "adminpanel",
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
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