<template>
    <div>
        <navbar/>
        <h1>Hi {{account.user.first_name}}!</h1>
        
        <div class="container-fluid w-100 text-dark wrapper-d">
            <div class="row px-5">
                <div :class = "(account.user.admin)?'col-md-8':'col-md-12'" class="programs">
                    <div class="float-left w-100 mx-auto"  v-for="program in programs.items" :key="program.program_id"> 
                        <router-link class="nav-link" to="/program">
                            <div class="program text-dark text-decoration-none">
                                <img v-bind:src=program.image alt="Picture" class="img-thumbnail program-img">
                                <div>{{program.name}}</div>
                                <div>{{program.createdByUser[0]['first_name'] + ' ' + program.createdByUser[0]['last_name']}}</div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="col-md-4 float-righ">
                    <div v-if="account.user.admin" class="float-right">
                        <adminpanel/>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import navbar from './navbar.vue';
import adminpanel from '../admin/adminpanel.vue'

export default {
   components: { navbar, adminpanel },
    computed: {
        ...mapState({
            account: state => state.account,
            programs: state => state.programs.all
        })
    },
    created () {
        this.getAllPrograms();
    },
    methods: {
        ...mapActions('programs', {
            getAllPrograms: 'getAll'
        })
    }
      
};
</script>

<style scoped>
    .programs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1rem;
    }

    .program {
        /* border: 1px solid #ccc; */
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
        transition: transform .2s;
    }

    .program:hover {
        text-decoration: none;
        transform: scale(1.1);
    }

    .wrapper-d {
        z-index: 2;
    }
</style>
