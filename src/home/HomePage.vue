<template>
    <div>
        <navbar/>
        <div class="mx-auto" style="width: 90%;">
            <h1>Hi {{account.user.first_name}}!</h1>
            <p>You're logged in LifeBeat!!</p>
            <h3>Users from secure api end point:</h3>
            <em v-if="users.loading">Loading users...</em>
            <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
            <ul v-if="users.items">
                <li v-for="user in users.items" :key="user.id">
                    <div>{{user.email + ' ' + user.first_name + ' ' + user.last_name }}</div> 
                    <div>{{ user.gender + ' ' + user.purpose + ' ' + user.height + 'cm' + ' ' + user.weight + 'kg  Age:' + user.age }} </div>
                    <div class="admin" v-if="user.admin">Admin</div>
                    <span v-if="account.user.admin">      
                    <span v-if="user.deleting"><em> - Deleting...</em></span>
                        <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                        <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
                    </span>
                </li>
            </ul>
        </div>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import navbar from './navbar.vue';

export default {
   components: { navbar },
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