<template>
    <img v-if="img" :src="img"/>
</template>
<script>
    export default {
        name: "photo",
        props: {trunk: Object, size: {default: '400'}},
        computed: {
            img() {
                if (this.trunk && this.trunk.photo) {
                    return this.trunk.photo.replace("[size]", this.size)
                }
            }
        }
    }
</script>