<template>
    <div>
        <navbar/>
        <h1>Hi {{account.user.first_name}}!</h1>
        <div class="container-fluid w-100">
            <div class="row">
                <div class="col-md-6 programs">
                    <div class="float-left w-100 mx-auto"  v-for="program in programs.items" :key="program.id"> 
                        <div class="program">
                            <img v-bind:src=program.imageUrl alt="Alt" class="img-thumbnail">
                            <div>{{program.name}}</div>
                            <div>{{program.user}}</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 float-righ">
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
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }

    .program {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }
</style>
