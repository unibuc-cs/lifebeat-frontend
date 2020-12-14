<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light nav-lifebeat">
    <a class="navbar-brand" href="/">LifeBeat</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/">Features</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/">Pricing</a>
        </li>
        <li class="nav-item">
            <a class="nav-link disabled" href="/">Disabled</a>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/login">Logout</router-link>
        </li>
        </ul>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
    .nav-lifebeat {
        overflow: hidden;
        position: fixed;
        top: 0;
        width: 100%;
        height: 65px;
        z-index: 1;
    }
</style>