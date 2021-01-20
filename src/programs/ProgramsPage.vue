npm<template>
    <div>
        <navbar />
        <h1>Programs </h1>
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

<style scoped>

</style>