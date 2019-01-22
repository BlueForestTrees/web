<template>
    <span v-if="info">
        <eq-show v-if="info.type === 'eq'" :info="info"/>
    </span>
    <loader v-else/>
</template>

<script>
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import EqShow from "./Eq"
    import {qtUnitName} from "../../services/calculations"
    import Loader from "../loader/Loader"

    export default {
        name: "info",
        components: {Loader, EqShow},
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