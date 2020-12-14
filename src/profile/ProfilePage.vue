<template>
    <div>
        <navbar />
        <h1>Profile </h1>
        <div v-if="account.user.admin">
            <adminpanel />
        </div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import navbar from '../home/navbar.vue';
    import adminpanel from '../admin/adminpanel.vue'

    export default {
        components: { navbar, adminpanel },
        computed: {
            ...mapState({
                account: state => state.account
            })
        },
    };
</script>

<style scoped>
    .admin {
        background: #51313126;
        border: 3px solid Teal;
        width: fit-content;
        margin: 2px;
    }
</style>