<template>
    <info-dense v-if="info" :info="info"/>
    <loader v-else/>
</template>

<script>
    import {GO} from "../../const/go"
    import {infoType} from "../../const/infoType"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import InfoDense from "./InfoDense"
    import Loader from "../loader/Loader"

    export default {
        name: "info-id-dense",
        components: {Loader, InfoDense},
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