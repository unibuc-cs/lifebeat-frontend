<template>
    <div>
        <navbar />
        <h1>Program Page</h1>
        
        
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
    };
</script>

<style>
.admin {
        background: #51313126;
        border: 3px solid Teal;
        width: fit-content;
        margin: 2px;
    }
</style>