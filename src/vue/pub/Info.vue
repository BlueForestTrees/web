<template>
    <div v-if="info">
        <eq-show v-if="info.type === 'eq'" :info="info"/>
    </div>
    <loader v-else/>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import EqShow from "./Eq"
    import Loader from "../loader/Loader"
    import OpenMessage from "../common/OpenMessage"

    export default {
        name: "info",
        components: {OpenMessage, Loader, EqShow},
        props: ['path'],
        data: () => ({
            info: null
        }),
        methods: {
            ...mapActions({getInfo: On.GET_INFO}),
            async refresh() {
                try {
                    this.info = await this.getInfo({path: this.path})
                } catch (e) {
                    console.error(e)
                }
            }
        },
        created: function () {
            this.refresh()
        },
        watch: {
            '$route'(to, from) {
                this.refresh()
            }
        },
    }
</script>