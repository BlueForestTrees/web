<template>
    <div id="app">
        <SearchGrid/>
    </div>
</template>

<script>
    import SearchGrid from './search/Search'

    export default {
        name: 'app',
        components: {
            SearchGrid
        }
    }
</script>

<style>
    #app, input {
        font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
        font-size: 1.5em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
