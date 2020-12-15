<template>
    <div>
        <navbar/>
        <h1>Hi {{account.user.first_name}}!</h1>
        
        <div class="container-fluid w-100 text-dark wrapper-d">
            <div class="row px-5">
                <div class="col-md-12 programs">
                    <em v-if="programs.loading">Loading programs...</em>
                    <img v-show="programs.loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==">
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
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import navbar from './navbar.vue';

export default {
   components: { navbar },
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

    .program-img{
        max-width: 300px;
        max-height: 300px;;
    }
</style>
