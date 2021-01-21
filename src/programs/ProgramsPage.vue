<template>
    <div>
        <navbar />
        <h1 class="text-center mt-1 mb-3">Create your own programs</h1>
            <div class='exercises-table float-left'>
            <div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ex, index) in exercises" :key="ex.exercise_id">
                        <th scope="row">{{ index + 1}}</th>
                        <td>{{ ex.name }}</td>
                        <td>
                            <input class="form-control" type="number" min="0" v-model="ex.duration" :disabled="ex.reps != 0 && ex.reps != null">
                        </td>
                        <td>
                            <input class="form-control" type="number" min="0" v-model="ex.reps" :disabled="ex.duration != 0 && ex.duration != null">
                        </td>
                        <td>
                            <button v-on:click="addExercise(index)" class="btn btn-info">
                                +
                            </button>
                        </td>
                        </tr>
                    </tbody>
                    </table>
            </div>
        </div>
        <div class='program-table w-50 float-right'>
            <div>
                        <span class="input-group-text" id="inputGroup-sizing-default">Program name:</span>
                            <input type="text" class="form-control" v-model="name" aria-describedby="inputGroup-sizing-default">

                        <span class="input-group-text">Program description</span>
                            <textarea class="form-control" aria-label="With textarea" v-model="description"></textarea>

                        <label for="purpose">Why do you want to use the app?</label>
                        <select v-model="purpose" class="form-control">
                            <option value='L'>Lose weight</option>
                            <option value='M'>Muscle increase</option>
                            <option value='S'>Stay in shape</option>
                        </select>
                        <button type="button" class="btn btn-success float-right mt-1 mb-3" @click="createProgram">Create Program</button>
                    </div>
            <div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Reps</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ex, index) in newProgramExercises" :key="ex.exercise_id">
                        <th scope="row">{{ index + 1}}</th>
                        <td>{{ ex.name }}</td>
                        <td>
                            <input class="form-control" type="number" min="0" v-model="ex.duration" :disabled="ex.reps != 0 && ex.reps != null">
                        </td>
                        <td>
                            <input class="form-control" type="number" min="0" v-model="ex.reps" :disabled="ex.duration != 0 && ex.duration != null">
                        </td>
                        <td>
                            <button v-on:click="removeExercise(index)" class="btn btn-info">
                                -
                            </button>
                        </td>
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
                exercises: state => state.programs.exercises.all
            })
        },
        created(){
            this.getExercises();
        },
        methods: {
                ...mapActions('programs', {
                getExercises: 'getAllExercises',
                createNewProgram: 'createProgram',
            }),
            addExercise(index){
                const ex_aux = this.exercises[index];
                this.exercises.splice(index, 1);
                this.newProgramExercises.push(ex_aux);
            },
            removeExercise(index){
                const ex_aux = this.newProgramExercises[index];
                this.newProgramExercises.splice(index, 1);
                this.exercises.push(ex_aux);
            },
            createProgram(){
                const programDetails = {
                    program: {
                        name: this.name,
                        purpose: this.purpose,
                        user_id: this.account.user.id,
                        description: this.description,
                    },
                    exercises: this.newProgramExercises
                };
                this.createNewProgram(programDetails);
            }
        },
        data() {
            return {
                newProgramExercises: [],
                purpose: '',
                description: '',
                name: ''
            }
    }
    };
</script>

<style scoped>
.exercises-table{
    width: 40%;
}
.program-table{
    width: 40%;
}

</style>