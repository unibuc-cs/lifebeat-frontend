<template>
    <div>
        <navbar />
        <h1>My Profile</h1>
        <div class="mt-5 ml-5">
            <h2 class="row">
                <icon class="icon-dumbbell" icon="dumbbell" />
                <small class="mr-2 ml-2">{{account.user.streakCount }}</small>
                <icon class="icon-dumbbell mr-3" icon="dumbbell" />
                {{ account.user.first_name + ' ' + account.user.last_name}}
            </h2>
            <div class="row h5 mt-3" >{{account.user.email}}</div>
            <div class="row h5 mt-3" >{{account.user.age}} years old</div>
            <div class="row h5 mt-3">
                <div v-if="account.user.gender == 'M'">Male</div>
                <div v-if="account.user.gender == 'F'">Female</div>
                <div v-if="account.user.gender == 'O'">Other</div>
            </div>
            <div class="row h5 mt-3">
                <div>Height: {{ account.user.height }} cm </div>
            </div>
            <div class="row h5 mt-3">
                <div>Weight: {{ account.user.weight }} kg </div>
            </div>
            <div class="row h5 mt-3">
                <div>Purpose:  </div>
                <div v-if="account.user.purpose == 'L'">Lose weight</div>
                <div v-if="account.user.purpose == 'M'">Muscle increase</div>
                <div v-if="account.user.purpose == 'S'">Stay in shape</div>
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
                account: state => state.account
            })
        },
    };
</script>

<style scoped>
.icon-dumbbell{
        color: rgb(165, 46, 46);
        font-size: 2.5rem;
    }
</style>