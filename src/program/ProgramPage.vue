<template>
    <div>
        <navbar />
        <div class="mt-3">
            <div class="row">
                <div class="col-md-3">
                    <img v-bind:src=program.image alt="Picture" class="img-thumbnail prog-img">
                </div>
                <div class="col-md-9 card-body d-flex flex-column">
                    <div class="row">
                        <h1 class="row display-3">{{ program.name }}</h1>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row h2 text-info">{{ program.description }}</div>
                            <router-link :to="'/user-profile/' + program.createdByUser[0]['id']">
                                <div class="row h6 text-secondary font-weight-bold">{{ program.createdByUser[0]['first_name'] + ' ' + program.createdByUser[0]['last_name'] }}</div>
                            </router-link>
                        </div>
                        <div class="mt-auto ml-auto">
                            <router-link class="nav-link" :to="{name: 'exercises', params: { exercises: exercises } }">
                                <button type="button" class="btn btn-success btn-lg start-btn">Start Program</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Duration/Reps</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ex, index) in exercises" :key="ex.exercise_id">
                    <th scope="row">{{ index + 1}}</th>
                    <td>{{ ex.name }}</td>
                    <td v-if="ex.duration">{{ ex.duration }}</td>
                    <td v-else>{{ ex.reps }}</td>
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
                program: state => state.details.prog,
                exercises: state => state.details.ex
            })
        },
        props: ['id'],
        created () {
            this.getProgramDetails(this.id);
        },
        methods: {
        ...mapActions('details', {
            getProgramDetails: 'getAll'
        })
    }
    };
</script>

<style scoped>
    .prog-img{
        max-width: 20rem;
        max-height: 20rem;;
    }

    .start-btn {
        z-index: 3;
    }
</style>