<template>
    <div>
        <navbar />
        <div class="row">
            <div class="col-md-9">
                <section class="player">
                    <div class="row">
                        <div class="mt-5 ml-5 col-md-8">
                            <img v-bind:src="current.video" alt="Video Exercise">
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
                    <td v-bind:class="{'text-danger': ex.exercise_id == current.exercise_id}">{{ ex.duration }}</td>
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

                    // const requestOptions = {
                    //     method: 'POST',
                    //     credentials: 'include',
                    //     headers: { 'Content-Type': 'application/json' },
                    //     body: JSON.stringify({ user_id })
                    // };
                    // console.log(fetch(`${config.apiUrl}/program-finished`, requestOptions).then(handleResponse))
                    // fetch(`${config.apiUrl}/program-finisheds`, requestOptions).then(handleResponse);
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
</style>