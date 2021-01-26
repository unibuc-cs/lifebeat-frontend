<template>
  <div>
      <navbar />
      <div class="w-100">
           <!-- <div class="mt-5 ml-5 bg-primary w-50"> -->
            <div class="row">
                <div class="main-profile col-5">
                    <h2 class="row">
                        <icon class="icon-dumbbell" icon="dumbbell" />
                        <small class="mr-2 ml-2">{{user.streakCount }}</small>
                        <icon class="icon-dumbbell mr-3" icon="dumbbell" />
                        <router-link :to="'/user-profile/' + user.id" class="text-decoration-none h1">
                            {{ user.first_name + ' ' + user.last_name}}
                        </router-link>
                    </h2>
                    <div class="row h5 mt-3 ml-4" >{{user.age}} years old</div>
                    <div class="row h5 mt-3 ml-4">
                        <div v-if="user.gender == 'M'">Male</div>
                        <div v-if="user.gender == 'F'">Female</div>
                        <div v-if="user.gender == 'O'">Other</div>
                    </div>
                    <div class="row h5 mt-3 ml-4">
                        <div>Height: {{ user.height }} cm </div>
                    </div>
                    <div class="row h5 mt-3 ml-4">
                        <div>Weight: {{ user.weight }} kg </div>
                    </div>
                    <div class="row h5 mt-3 ml-4">
                        <div>Purpose:  </div>
                        <div class="ml-3 text-danger h3" v-if="user.purpose == 'L'">Lose weight</div>
                        <div class="ml-3 text-danger h3" v-if="user.purpose == 'M'">Muscle increase</div>
                        <div class="ml-3 text-danger h3" v-if="user.purpose == 'S'">Stay in shape</div>
                    </div>
                    </div>
                    <div class="col-5 mt-5">
                        <h1 class="row"> Achievements </h1>
                            <button v-for="ach in user.achievements" :key="ach.level_needed" class="snip1582 w-100">{{ach.name}}</button>
                    </div>
            </div>
            <div class="row mt-5">
                <h1 class="mt-3 w-50"> {{user.first_name}}'s programs </h1>
                <div class="ml-5 mt-5 programs-table table-responsive w-75">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Program</th>
                            <th scope="col">Purpose</th>
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
                            </tr>
                            
                        </tbody>
                        </table>
                </div>
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
                user: state => state.users.user,
                progs: state => state.programs.byUser.all
            })
        },
        props: ['id'],
        created () {
            this.getUser(this.id);
            console.log(this.user)
            this.getPrograms(this.id);
        },
        methods: {
        ...mapActions('users', {
            getUser: 'getById'
        }),
        ...mapActions('programs', {
                getPrograms: 'getProgramsCreatedByUser'
            }),
        }
    };
</script>

<style>
.programs-table{
    max-height: 750px;
}

.icon-dumbbell{
        color: rgb(165, 46, 46);
        font-size: 2.5rem;
    }

.main-profile {
    width: 50%;
    margin-top: 40px;
    margin-left: 150px;
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