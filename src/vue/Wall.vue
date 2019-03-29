<template>
    <search-list :type="On.SEARCH_ALL"/>
</template>

<script>
    import SearchList from "./common/SearchList"
    export default {
        name: "wall",
        components: {SearchList}
    }
</script>