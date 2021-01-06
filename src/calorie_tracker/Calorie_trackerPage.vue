<template>
    <div>
        <navbar />
        <div id="app-cal">
            <h1 class="title">
                <icon class="fa" icon="heartbeat" />
                <!-- <i class="fa fa-heartbeat"></i> -->
             Calorie Counter
             </h1>
            <div class="entry header">
                <div class="long">Description</div>
                <div class="short">Calories</div>
                <div class="short">Fat</div>
                <div class="short">Carbs</div>
                <div class="short">Protein</div>
            </div>
            <div class="entry" v-for="entry in entries" :key="entry.id" transition="fade">
                <input type="text" v-bind:name="'description-' + entry.id" v-model="entry.description" class="long" v-on:keyup.enter="saveEntry">
                <input type="number" v-bind:name="'calories-' + entry.id" v-model="entry.calories" class="short" v-on:keyup.enter="saveEntry">
                <input type="number" v-bind:name="'fat-' + entry.id" v-model="entry.fat" class="short" v-on:keyup.enter="saveEntry">
                <input type="number" v-bind:name="'carbs-' + entry.id" v-model="entry.carbs" class="short" v-on:keyup.enter="saveEntry">
                <input type="number" v-bind:name="'protein-' + entry.id" v-model="entry.protein" class="short" v-on:keyup.enter="saveEntry">
                <button class="material-delete" v-on:click="removeEntry($index)">
                    <icon class="icon-dumbbell" icon="plus" />
                </button>
            </div>
            <div class="totals mb-1">
                <div class="long">Totals:</div>
                <div class="short" v-bind:class="{ 'text-danger': totalCaloriesLeft < 0 }">{{ totalCalories }}</div>
                <div class="short" v-bind:class="{ 'text-danger': totalFatLeft < 0 }">{{ totalFat }}</div>
                <div class="short" v-bind:class="{ 'text-danger': totalCarbsLeft < 0 }">{{ totalCarbs }}</div>
                <div class="short" v-bind:class="{ 'text-danger': totalProteinLeft < 0 }">{{ totalProtein }}</div>
            </div>
            <div class="totals mt-0">
                <div class="long">Totals Left for the day:</div>
                <div class="short" v-bind:class="{ 'text-danger': totalCaloriesLeft < 0 }">{{ totalCaloriesLeft }}</div>
                <div class="short" v-bind:class="{ 'text-danger': totalFatLeft < 0 }">{{ totalFatLeft }}</div>
                <div class="short" v-bind:class="{ 'text-danger': totalCarbsLeft < 0 }">{{ totalCarbsLeft }}</div>
                <div class="short" v-bind:class="{ 'text-danger': totalProteinLeft < 0 }">{{ totalProteinLeft }}</div>
            </div>

            <div class="new">
                <input type="text" v-model="newDescription" v-on:keyup.enter="addEntry" class="long" placeholder="Description">
                <input type="number" v-model="newCalories" v-on:keyup.enter="addEntry" class="short" placeholder="Calories">
                <input type="number" v-model="newFat" v-on:keyup.enter="addEntry" class="short" placeholder="Fat">
                <input type="number" v-model="newCarbs" v-on:keyup.enter="addEntry" class="short" placeholder="Carbs">
                <input type="number" v-model="newProtein" v-on:keyup.enter="addEntry" class="short last-child" placeholder="Protein">
                <button class="material-button" v-on:click="addEntry()">
                     <icon class="icon-dumbbell" icon="plus" />
                </button>
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
            }),
        },
        data() {
            return {
            newDescription: '',
            newCalories: '',
            newFat: '',
            newCarbs: '',
            newProtein: '',
            totalCalories: '',
            totalFat: '',
            totalCarbs: '',
            totalProtein: '',
            totalCaloriesLeft: 1000,
            totalFatLeft: 1000,
            totalCarbsLeft: 1000,
            totalProteinLeft: 1000,
            entries: [
                // { id: 3, description:'This is an item', calories: 223, fat: 12, carbs: 30, protein: 10 },
                // { id: 2, description:'This is also an item', calories: 50, fat: 1, carbs: 10, protein: 1 },
                // { id: 1, description:'Hey, me, too!', calories: 175, fat: 3, carbs: 15, protein: 8 }
            ]
            }
        },
        methods: {
            addEntry: function () {
                var description = this.newDescription.trim()
                var calories = parseInt(this.newCalories.trim()) || 0
                var fat = parseInt(this.newFat.trim()) || 0
                var carbs = parseInt(this.newCarbs.trim()) || 0
                var protein = parseInt(this.newProtein.trim()) || 0

                // this.totalCaloriesLeft = this.totalCaloriesLeft - calories
                // this.totalFatLeft = this.totalFatLeft - fat
                // this.totalCarbsLeft = this.totalCarbsLeft - carbs
                // this.totalProteinLeft = this.totalProteinLeft - protein


                if (description && calories) {
                    this.entries.push({ description: description, calories: calories, fat: fat, carbs: carbs, protein: protein })
                    this.newDescription = ''
                    this.newCalories = ''
                    this.newFat = ''
                    this.newCarbs = ''
                    this.newProtein = ''
                    calculateTotals(this)
                } else {
                    alert("You need at least a description and calories!")
                }
            },
            removeEntry: function (index) {
                this.entries.splice(index, 1)
                calculateTotals(this)
            },
            saveEntry: function() {
              calculateTotals(this)
            }
        },
        created() {
            this.totalCalories_G = 0 
            if(this.account.user.gender == "M"){
                this.totalCaloriesLeft_G = 66.47 + 13.75 * this.account.user.weight + 5.003 * this.account.user.height - 6.755 * this.account.user.age
           }else{
                this.totalCaloriesLeft_G = 655.1 + 9.563 * this.account.user.weight + 1.85 * this.account.user.height - 4.676 * this.account.user.age
            }

            if(this.account.user.purpose == 'L'){
                this.totalCaloriesLeft_G = this.totalCaloriesLeft_G  - 250
                this.totalFatLeft_G = this.totalCaloriesLeft_G * 0.25
                this.totalCarbsLeft_G = this.totalCaloriesLeft_G * 0.45
                this.totalProteinLeft_G = this.totalCaloriesLeft_G * 0.30
            }else if(this.account.user.purpose == 'M'){
                this.totalCaloriesLeft_G = this.totalCaloriesLeft_G  + 250
                this.totalFatLeft_G = this.totalCaloriesLeft_G * 0.25
                this.totalCarbsLeft_G = this.totalCaloriesLeft_G * 0.40
                this.totalProteinLeft_G = this.totalCaloriesLeft_G * 0.35
            }else if(this.account.user.purpose == 'S'){
                this.totalCaloriesLeft_G = this.totalCaloriesLeft_G
                this.totalFatLeft_G = this.totalCaloriesLeft_G * 0.25
                this.totalCarbsLeft_G = this.totalCaloriesLeft_G * 0.45
                this.totalProteinLeft_G = this.totalCaloriesLeft_G * 0.30
            }

           calculateTotals(this) 
        },
        
        
    };

    function calculateTotals(app) {
            
                app.totalCalories = parseTotals(app.entries, 'calories')
                app.totalFat = parseTotals(app.entries, 'fat')
                app.totalCarbs = parseTotals(app.entries, 'carbs')
                app.totalProtein = parseTotals(app.entries, 'protein')

                app.totalCaloriesLeft = Math.floor(app.totalCaloriesLeft_G - app.totalCalories)
                app.totalFatLeft = Math.floor(app.totalFatLeft_G - app.totalFat)
                app.totalCarbsLeft = Math.floor(app.totalCarbsLeft_G - app.totalCarbs)
                app.totalProteinLeft = Math.floor(app.totalProteinLeft_G - app.totalProtein)
            }

    function parseTotals(array, element) {
                var sum = 0
                array.forEach(function(entry) {
                    sum = sum + parseInt(entry[element])
                }, sum, element)
                return sum
            }
</script>

<style scoped>

#app-cal {
  margin: 3rem auto;
  width: 1150px;
  padding: 1rem 2rem;
  background: #fafafa;
  box-shadow: 3px 3px 3px 0 #0003;
  border-radius: 5px;
}
.title {
  font-weight: 100;
  color: #B2DFDB;
  margin:-1rem -2rem 1rem;
  padding: 1rem 2rem;
  background:#009688;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: relative;
  text-align: center;
  overflow:hidden;
}

.title .fa {
    color: #004D40;
    position: absolute;
    left: 0rem;
    top: -.75rem;
    font-size: 7rem;
  }

.entry, .new {
  font-size: 0;
  position: relative;
}
.entry + .entry {
  margin-top: 2.25%;
}

.entry .long {
    font-size: .75rem;
    width: 40%;
}

.entry .short {
    font-size: .75rem;
    width: 12%;
}


.last-child {
    margin-right: 0;
}

.long, .short {
  font-size: .8rem;
  display:inline-block;
  margin: 0 2.25% 0 0;
}
.header {
  margin: -1rem -2rem 1rem;
  border-bottom: 1px solid #eee;
  padding: 1rem 2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.header .long{
    font-size: .85rem;
}

.header .short{
    font-size: .85rem;
}

.long { width: 40%; }
.short {
  width: 12%;
}

.totals {
  color: #000000cf;
  margin: 1.5rem -2rem;
  background:#a2a2a28a;
  border: 1px solid #00000030;
  border-left: 0;
  border-right: 0;
  padding: 1rem 2rem;
}

.totals .long{
    font-size: 1.2rem;
    font-weight: 500;
    text-align: right;
}

.totals .short{
    font-weight: 900;
    text-align: center;
    margin-right: 0;
}

/* .totals .short-last-child{
    font-weight: 900;
    text-align: center;
    margin-right: 0;
} */


.fade-transition {
  transition: all .3s ease;
  opacity: 1;
  height: 1.5rem;
}

.fade-enter, .fade-leave {
  opacity: 0;
  height: 0;
}


input {
  transition: all .15s ease-in-out;
  margin: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid grey;
  padding: .15rem;
  color: black;
}

input:hover {
    color: #000000bf;
    border-color: #000000bf;
}

input:focus{
    outline: none;
    border-bottom: 3px solid black;
    margin-bottom: -2px;
}


.material-button, .material-delete {
  transition: all .15s ease-in-out;
  background: hsla(159,54%,76%,1);
  border: none;
  background:#009688;
  font-size: 2.5rem;
  position: absolute;
  right: -3.25rem;
  top: -.75rem;
  display: block;
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  border-radius: 50%;
  color: #fafafa;
  box-shadow: 1px 1px 3px 0 #00000030;
}

.material-button:hover, .material-delete:hover{
    background: #1DE9B6;
    box-shadow: 1px 3px 3px 0 #00000030;
}

.material-button:active, .material-delete:active{
    top:-.7rem;
    outline: 0;
    box-shadow: none;
}

.material-delete {
  font-size: 1rem;
  line-height: 1rem;
  height: 2rem;
  width: 2rem;
  top: 0;
  right: -1.5rem;
  transform: rotate(45deg);
  background: none;
  color:#0000004f;
  box-shadow: none;
 
}

.material-delete:hover{
    background: #00000099;
    color: #fafafa;
    box-shadow: none;
}

.material-delete:active{
    color: #B71C1C;
    background: transparent;
    top: 0;
}

</style>