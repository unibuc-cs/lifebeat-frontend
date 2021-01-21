<template>
    <div>
        <navbar/>
        <div class="row mt-3 ml-2">
            <h1 class="">Hi {{account.user.first_name}}!</h1>
            <form class="float-right w-75 ml-5">
                <input class="form-control form-control-lg" type="text" v-model="search" placeholder="Search program title.." aria-label="Search">
            </form>
        </div>
        <div class="container-fluid  text-dark wrapper-d">
            <div class="row">
                <div class="col-12 programs">
                    <em v-if="programs.loading">Loading programs...</em>
                    <img v-show="programs.loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==">
                    <!-- <div class="float-left mx-auto"  v-for="program in displayedPosts" :key="program.program_id" v-if="program.purpose == account.user.purpose"> -->
                    <div class="float-left mx-auto"  v-for="program in displayedPosts" :key="program.program_id">
                        <router-link class="nav-link" :to="'/program/' + program.program_id">
                            <div class="program text-dark text-decoration-none">
                                <img v-bind:src=program.image alt="Picture" class="img-thumbnail program-img">
                                <div>{{program.name}}</div>
                                <!-- <router-link :to="'/user-profile/' + user.id"> -->
                                    <div>{{program.createdByUser[0]['first_name'] + ' ' + program.createdByUser[0]['last_name']}}</div>
                                <!-- </router-link> -->
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="row float-right mr-5" v-if="!search">
                <nav aria-label="Page navigation example" v-if="pages.length != 1">
                    <ul class="pagination">
                        <li class="page-item">
                        <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
                        </li>
                        <li class="page-item">
                        <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber" v-bind:class="{'current-btn': pageNumber == page}"> {{pageNumber}} </button>
                        </li>
                        <li class="page-item">
                        <button type="button" @click="page++" v-if="page < pages.length " class="page-link"> Next </button>
                        </li>
                    </ul>
                </nav>  
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
        }),
        filteredList() {
            return this.programs.items.filter(post => {
                return post.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        displayedPosts() {
            if(this.pages.length == 0){
                this.setPages();
            }
            return this.paginate(this.filteredList);
        },
        
    },
    created () {
        this.getAllPrograms(this.account.user.purpose);
        this.updateCurrentUser(this.account.user.id);
        this.reloadPage();
    },
    data() {
        return {
            page: 1,
            perPage: 4,
            pages: [],
            search: ''
        }
    },
    methods: {
        ...mapActions('programs', {
            getAllPrograms: 'getAll'
        }),
        ...mapActions('account', {
            updateCurrentUser: 'updateCurrentUser'
        }),
        setPages() {
                if(this.programs.error){
                    window.location.href = '/login';
                    return;
                }

                let numberOfPages = Math.ceil(this.programs.items.length / this.perPage);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
        },
        paginate (posts) {
                let page = this.page;
                let perPage = this.perPage;
                let from = (page * perPage) - perPage;
                let to = (page * perPage);
                // console.log(posts.slice(from, to))
                return  posts.slice(from, to);
                },
        reloadPage() {
            // The last "domLoading" Time //
            var currentDocumentTimestamp =
            new Date(performance.timing.domLoading).getTime();
            console.log('refresh')
            // Current Time //
            var now = Date.now();
            // Ten Seconds //
            var tenSec = 10 * 1000;
            // Plus Ten Seconds //
            var plusTenSec = currentDocumentTimestamp + tenSec;
            if (now > plusTenSec) {
            location.reload();
            } else {}
        }
    },
    watch: {
         posts() {
            this.setPages();
        }
    },
    filters: {
        trimWords(value){
            return value.split(" ").splice(0,20).join(" ") + '...';
        }
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
        width: 18rem;
        height: 18rem;;
    }

    button.page-link {
        display: inline-block;
    }
    button.page-link {
        font-size: 20px;
        color: #29b3ed;
        font-weight: 500;
    }
    .offset{
        width: 500px !important;
        margin: 20px auto;  
    }
    .current-btn{
        background: #cfd2e9;
    }
</style>
