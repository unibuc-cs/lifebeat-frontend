<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light nav-lifebeat text-dark">
    <a class="navbar-brand" href="/">LifeBeat</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <!-- <router-link class="nav-link" to="/programs">My Programs</router-link> -->
                <router-link class="nav-link" to="/">My Programs</router-link>
            </li>
            <!-- <li class="nav-item">
                <router-link class="nav-link" to="/calorie_tracker">Calorie Tracker</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/leaderboard">Leaderboard</router-link>
            </li> -->
            <li class="nav-item">
                <router-link class="nav-link" to="/profile">My Profile</router-link>
            </li>
            <li class="nav-item" v-if="account.user.admin">
                <router-link class="nav-link" to="/admin-panel">Admin Panel</router-link>
            </li>
        </ul>
        <ul class="navbar-nav mr-5">
            <span class="navbar-text">
                <icon class="icon-dumbbell" icon="dumbbell" />
                {{account.user.streak_count }}
                <icon class="icon-dumbbell mr-3" icon="dumbbell" />
                {{ account.user.first_name + ' ' + account.user.last_name}}
            </span>
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Logout</router-link>
            </li>
            
            <!-- <li class="nav-item dropdown">>
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                User Profile
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <router-link class="dropdown-item" to="/profile">My Profile</router-link>
                    <router-link class="dropdown-item" to="/login">Logout</router-link>
                </div>
            </li> -->
        </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import navbar from '../home/navbar.vue';

export default {
    name: 'NavBar',
    components: { navbar },
    computed: {
            ...mapState({
                account: state => state.account
            })
        },
};
</script>

<style scoped>
    .nav-lifebeat {
        overflow: hidden;
        position: fixed;
        top: 0;
        width: 100%;
        height: 65px;
        z-index: 1;
    }

    .icon-dumbbell{
        color: rgb(165, 46, 46);
        font-size: 1.4rem;
    }
</style>