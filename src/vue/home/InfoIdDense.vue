<template>
    <info-dense :info="info"/>
</template>

<script>
    import {GO} from "../../const/go"
    import {infoType} from "../../const/labels"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import InfoDense from "./InfoDense"

    export default {
        name: "info-id-dense",
        components: {InfoDense},
        props: ["infoId"],
        data: () => ({
            GO,
            infoType,
            info: null
        }),
        methods: {
            ...mapActions({
                getInfo: On.GET_INFO
            })
        },
        async created() {
            this.info = await this.getInfo({_id: this.infoId})
        }
    }
</script>