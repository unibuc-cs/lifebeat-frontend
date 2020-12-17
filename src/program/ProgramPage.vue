<template>
    <div>
        <navbar />
        <div class="mt-3">
            <div class="row">
                <div class="col-md-3">
                    <img v-bind:src=program.image alt="Picture" class="img-thumbnail prog-img">
                </div>
                <div class="col-md-9 card-body d-flex flex-column">
                    <div class="col">
                        <h1 class="row display-3">{{ program.name }}</h1>
                        <p class="h2 text-info">{{ program.description }}</p>
                        <p class="h6 text-secondary">{{ program.createdByUser[0]['first_name'] + ' ' + program.createdByUser[0]['last_name'] }}</p>
                    </div>
                    <div class="row mt-auto ml-auto">
                        <router-link class="nav-link" :to="{name: 'exercises', params: { exercises: program.exercises } }">
                            <button type="button" class="btn btn-success btn-lg start-btn">Start Program</button>
                        </router-link>
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
                    <tr v-for="(ex, index) in program.exercises" :key="ex.exercise_id">
                    <th scope="row">{{ index + 1}}</th>
                    <td>{{ ex.name }}</td>
                    <td>{{ ex.duration }}</td>
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
                program: state => state.details.all
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