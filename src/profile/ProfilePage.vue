<template>
    <div>
        <navbar />
        <h1>My Profile</h1>
        <div class="mt-5 ml-5 ">
            <div class="row">
            <div class="col-6">
                <h2 class="row ">
                    <icon class="icon-dumbbell" icon="dumbbell" />
                    <small class="mr-2 ml-2">{{account.user.streakCount }}</small>
                    <icon class="icon-dumbbell mr-3" icon="dumbbell" />
                    {{account.user.email}}
                </h2>
                <div class="">
                    <div class="row h5 mt-3">First name:
                        <input type="text" class="ml-2" v-model="user.first_name" :placeholder="account.user.first_name">
                    </div>
                    <div class="row h5 mt-3">Last name: 
                        <input type="text" class="ml-2" v-model="user.last_name" :placeholder="account.user.last_name">
                        </div>
                    <div class="row h5 mt-3">Age:
                        <input type="number" class="ml-2" v-model="user.age" :placeholder="account.user.age"> 
                        <span class="ml-1"> years old </span>
                        </div>
                    <div class="row h5 mt-3"> Gender: 
                        <span v-if="!changeGender" class="ml-2">
                            <div v-if="account.user.gender == 'M'">Male</div>
                            <div v-if="account.user.gender == 'F'">Female</div>
                            <div v-if="account.user.gender == 'O'">Other</div>
                        </span>
                        <span v-else>
                            <select v-model="user.gender" name="gender" id="gender" class="form-control ml-2">
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                                <option selected value='O'>Other</option>
                            </select>
                        </span>
                        <button class="ml-5 btn btn-info" @click="toggleChangeGender()">Change</button>
                    </div>
                    <div class="row h5 mt-3"> Height:
                        <input type="number" class="ml-2" v-model="user.height" :placeholder="account.user.height"> 
                        <span class="ml-1">   cm </span>
                    </div>
                    <div class="row h5 mt-3">Weight:
                        <input type="number" class="ml-2" v-model="user.weight" :placeholder="account.user.weight"> 
                        <span class="ml-1">  kg </span>
                    </div>
                    <div class="row h5 mt-3">
                        <div>Purpose:  </div>  
                        <span v-if="!changePurpose" class="ml-2">
                            <div v-if="account.user.purpose == 'L'">Lose weight</div>
                            <div v-if="account.user.purpose == 'M'">Muscle increase</div>
                            <div v-if="account.user.purpose == 'S'">Stay in shape</div>
                        </span>
                        <span v-else>
                            <select v-model="user.purpose" name="purpose" id="purpose" class="form-control ml-2">
                                <option value='L'>Lose weight</option>
                                <option value='M'>Muscle increase</option>
                                <option value='S'>Stay in shape</option>
                            </select>
                        </span>
                        <button class="ml-5 btn btn-info" @click="toggleChangePurpose()">Change</button>
                    </div>
                    <router-link to="/">
                        <button class="btn btn-secondary btn-lg mr-5 float-right w-25" @click="submitChanges()">
                            Submit
                        </button>
                    </router-link>
                </div>
            </div>
            <div class="col-5">
               <h1 class="row"> Achievements </h1>
                    <button v-for="ach in account.user.achievements" :key="ach.level_needed" class="snip1582 w-100">{{ach.name}}</button>
                <h1 class="row mt-3"> Your programs </h1>
                <div class="row ml-5 mt-5 programs-table table-responsive">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Program</th>
                            <th scope="col">Purpose</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(prog, index) in progs" :key="prog.program_id">
                                <th scope="row" >{{ index + 1 }}</th>
                                <router-link :to="'/program/' + prog.program_id">
                                    <td>{{ prog.name }}</td>
                                </router-link>
                                <td v-if="prog.purpose == 'M'">Muscle Increase</td>
                                <td v-if="prog.purpose == 'L'">Lose weight</td>
                                <td v-if="prog.purpose == 'S'">Stay in shape</td>
                                <td>
                                    <input type="submit" class="btn btn-danger" @click="deletePrograms(prog.program_id)" value="Delete">
                                </td>
                            </tr>
                            
                        </tbody>
                        </table>
                </div>
            </div>
            </div>
        </div>
        <!-- <div class="w-25 float-right">
                    <button v-for="ach in account.user.achievements" :key="ach.level_needed" class="snip1582">{{ach.name}}</button>
            </div> -->
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
                progs: state => state.programs.byUser.all
            })
        },
        data(){
            return {
                user: {
                    id: '',
                    email: '',
                    age: '',
                    first_name: '',
                    last_name: '',
                    gender: '',
                    height: '',
                    weight: '',
                    purpose: ''
                },
                changeFirstName: false,
                changeLastName: false,
                changeAge: false,
                changeGender: false,
                changeHeight: false,
                changeWeight: false,
                changePurpose: false
            }
        },
        created () {
            this.getPrograms(this.account.user.id);
        },
        methods:{
            ...mapActions('account', {
            updateUser: 'update'
            }),
            ...mapActions('programs', {
                getPrograms: 'getProgramsCreatedByUser',
                deleteProgram: 'deleteProgramById',
            }),
            submitChanges(){
                for (const [key, value] of Object.entries(this.user)) {
                    if(!this.user[key]){
                        this.user[key] = this.account.user[key];
                    }
                }
                this.account.user.purpose = this.user.purpose;
                this.updateUser(this.user);
                
            },
            deletePrograms(program_id){
                // console.log(program_id);
                // console.log( this.account.user.id);
                const details = {
                    'program_id': program_id,
                    'user_id': this.account.user.id
                }
                // console.log(details)
                this.deleteProgram(details);
            },
            toggleChangeFirstName(){
                this.changeFirstName = !this.changeFirstName;
            },
            toggleChangeLastName(){
                this.changeLastName = !this.changeLastName;
            },
            toggleChangeAge(){
                this.changeAge = !this.changeAge;
            },
            toggleChangeGender(){
                this.changeGender = !this.changeGender;
            },
            toggleChangeHeight(){
                this.changeHeight = !this.changeHeight;
            },
            toggleChangeWeight(){
                this.changeWeight = !this.changeWeight;
            },
            toggleChangePurpose(){
                this.changePurpose = !this.changePurpose;
            }
        }
    };
</script>

<style scoped>
.programs-table{
    max-height: 400px;
}

.icon-dumbbell{
        color: rgb(165, 46, 46);
        font-size: 2.5rem;
    }

.snip1582 {
    background-color: #c47135;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: 'BenchNine', Arial, sans-serif;
  font-size: 1em;
  font-size: 22px;
  line-height: 1em;
  margin: 15px 40px;
  outline: none;
  padding: 12px 40px 10px;
  position: relative;
  text-transform: uppercase;
  font-weight: 700;
}

.snip1582:before,
.snip1582:after {
  border-color: transparent;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
  border-style: solid;
  border-width: 0;
  content: "";
  height: 24px;
  position: absolute;
  width: 24px;
}

.snip1582:before {
  border-color: #c47135;
  border-top-width: 2px;
  left: 0px;
  top: -5px;
}

.snip1582:after {
  border-bottom-width: 2px;
  border-color: #c47135;
  bottom: -5px;
  right: 0px;
}

.snip1582:hover,
.snip1582.hover {
  background-color: #c47135;
}

.snip1582:hover:before,
.snip1582.hover:before,
.snip1582:hover:after,
.snip1582.hover:after {
  height: 100%;
  width: 100%;
}
</style>