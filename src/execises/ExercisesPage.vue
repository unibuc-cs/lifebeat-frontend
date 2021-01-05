<template>
    <div>
        <navbar />
        <div class="row">
            <div class="col-md-9">
                <section class="player">
                    <div class="row">
                        <div class="mt-5 ml-5 col-md-8">
                            <img v-bind:src="current.video" alt="Video Exercise" class="video-lifebeat" v-if="exercises.indexOf(current)%2==0">
                            <img v-bind:src="current.video" alt="Video Exercise" class="video-lifebeat" v-if="exercises.indexOf(current)%2==1">
                        </div>
                        
                    </div>
                    <div class="ex-details mt-3">
                        <h2 class="ml-2">
                            {{ current.name }}
                        </h2>
                        <p>
                            {{ current.description }}
                        </p>
                        <h4 v-if="current.duration">
                           {{ current.duration }} seconds
                        </h4>
                        <h4 v-else>
                            {{current.reps}} reps
                        </h4>
                        <div class="timer numberCircle" v-if="current.duration">
                            {{ timer }}
                        </div>
                    </div>
                    <div class="controls">
                        <!-- <button class="play" v-if="!isPlaying" @click="play">
                            Play
                        </button>
                        <button class="pause" v-else @click="pause">
                            Pause
                        </button> -->
                        <div class="float-right mr-5 pr-5">
                            
                            <!-- <button class="next btn btn-info btn-lg" @click="next" v-if="exercises.length > 1 && exercises.indexOf(current) < exercises.length - 1"> -->
                            <button class="next btn btn-info btn-lg" @click="next" v-if="exercises.length > 1 && exercises.indexOf(current) < exercises.length - 1" :disabled="timer != 0">
                                Next
                            </button>
                            <router-link class="nav-link" to="/" v-else>
                                <button class="next btn btn-info btn-lg" @click="finishedProgram(account.user.id)" :disabled="timer != 0">
                                    Finish
                                </button>
                            </router-link>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-md-3">
                <section class="list-of-exercises">
                    <h3>Exercises</h3>
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
                    <th scope="row" v-bind:class="{'text-danger': ex.exercise_id == current.exercise_id}">{{ index + 1}}</th>
                    <td v-bind:class="{'text-danger': ex.exercise_id == current.exercise_id}">{{ ex.name }}</td>
                    <td v-bind:class="{'text-danger': ex.exercise_id == current.exercise_id}" v-if="ex.duration">{{ ex.duration }}</td>
                    <td v-bind:class="{'text-danger': ex.exercise_id == current.exercise_id}" v-else>{{ ex.reps }}</td>
                    </tr>
                </tbody>
                </table>
                    <!-- <ul class="">
                        <li v-for="ex in exercises" :key="ex.exercise_id">
                            <div>
                                <p>{{ ex.name }}</p>
                            </div>
                            <div>
                                <p>{{ ex.duration }}</p>
                            </div>
                        </li>
                    </ul> -->
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import config from 'config';
    import { mapState, mapActions } from 'vuex';
    import navbar from '../home/navbar.vue';

    export default {
        components: { navbar },
        computed: {
            ...mapState({
                account: state => state.account
            })
        },
        methods: {
                finishedProgram(user_id){
                    console.log(user_id)

                    var points = 0
                    this.exercises.forEach(element => {
                        points = points + element.points
                    });

                    var current_date = new Date();
                    // console.log("current_date:", current_date);
                    var current_date_iso = current_date.toISOString();
                    // console.log("current_date_iso:", current_date_iso);
                    var yesterday = current_date;
                    yesterday.setDate(yesterday.getDate() - 1);
                    yesterday.setHours(0,0,0,0);
                    // console.log("yesterday:", yesterday);

                    var last_date = new Date(this.account.user.last_program_finish_date);
                    // var last_date = new Date("2020-12-18T11:05:32.000Z");

                    // console.log("last_date:", last_date);

                    var curr_2 = new Date();
                    curr_2.setHours(0,0,0,0);

                    // console.log("curr_2:", curr_2);

                    var streak_count = this.account.user.streakCount;
                    if(last_date < curr_2){
                        if(yesterday < last_date){
                            streak_count = streak_count + 1;
                        }else{
                            streak_count = 1;
                        }
                    }
                    this.account.user.streakCount = streak_count;
                    this.account.user.last_program_finish_date = current_date_iso;

                    const body = {
                        user_id: user_id,
                        streak_count: streak_count,
                        last_program_finish_date: current_date_iso,
                        points: points
                    }
                    console.log(body)

                    const requestOptions = {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                    };
                    // console.log(fetch(`${config.apiUrl}/users/streak`, requestOptions).then(handleResponse))
                    fetch(`${config.apiUrl}/users/streak`, requestOptions).then(handleResponse);
                },
                listenersWhenPlay() {
                    this.player.addEventListener("timeupdate", () => {
                        var playerTimer = this.player.currentTime;
                        this.currentlyTimer = formatTimer(playerTimer);
                        this.current.percent = (playerTimer * 100) / this.current.seconds;
                        this.current.isPlaying = true;
                    });
                    this.player.addEventListener(
                        "ended",
                        function() {
                        this.next();
                        }.bind(this)
                    );
                },
                setCover() {
                    this.coverObject.animated = true;
                    setTimeout(() => {
                        this.coverObject.animated = false;
                    }, 1000);
                },
                setCurrentSong(){
                    this.current = this.exercises[this.index];
                    this.play(this.current);
                    this.setCover();
                },
                play(song) {
                    if (typeof song.src !== "undefined") {
                        this.current.isPlaying = false;
                        this.index = this.exercises.indexOf(this.current);
                        this.current = song;
                        this.player.src = this.current.src;
                    }
                    this.player.play();
                    this.isPlaying = true;
                    this.setCover();
                    this.listenersWhenPlay();
                },
                pause() {
                    this.player.pause();
                    this.isPlaying = false;
                },
                next() {
                    this.current.isPlaying = false;
                    this.index = this.exercises.indexOf(this.current);
                    this.index++;
                    if (this.index > this.exercises.length - 1) {
                        this.index = 0;
                    }
                    this.setCurrentSong();
                    this.timer = parseInt(this.current.duration)
                },
                handleResponse(response) {
                    return response.text().then(text => {
                        const data = text && JSON.parse(text);
                        if (!response.ok) {
                            if (response.status === 401) {
                                // auto logout if 401 response returned from api
                                logout();
                                location.reload(true);
                            }

                            const error = (data && data.message) || response.statusText;
                            return Promise.reject(error);
                        }

                        return data;
                    });
                }
            },
            props: ['exercises'],
        data() {
           return {
               current: {},
               coverObject: { cover: true, animated: false },
               index: 0,
               isPlaying: false,
               currentlyTimer: "00:00",
               player: new Audio(),
               timer: parseInt(this.exercises[0].duration)
           }
        },
        mounted() {
            this.current = this.exercises[this.index];
            this.player.src = this.current.src;
            setInterval(() => {
                if(this.timer != 0){
                    this.timer -= 1
                    }
                }, 1000)
        }
    };
</script>

<style scoped>
.numberCircle {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    padding: 8px;

    background: #fff0;
    border: 2px solid #666;
    color: #666;
    text-align: center;
    margin-left: 6rem;
    font: 32px Arial, sans-serif;
}

.video-lifebeat{
    max-height: 400px;
}
</style>