<template>

    <span>
        <!--<v-btn v-if="!tree" fab bottom right color="pink" dark fixed @click.stop="onAddClick" class="floating-bar">-->
            <!--<v-icon>add</v-icon>-->
        <!--</v-btn>-->
        <!--<v-btn v-else-if="!compareTo" fab bottom right color="pink" dark fixed @click.stop="openOtherTree" class="floating-bar">-->
            <!--<v-icon x-large>settings_ethernet</v-icon>-->
        <!--</v-btn>-->
    </span>

</template>

<script>
    import Do from "../../const/do";
    import {mapMutations, mapState} from 'vuex';
    import {Dial} from "../../const/dial";

    export default {
        methods: {
            ...mapMutations({
                "doShowDialog": Do.SHOW_DIALOG
            }),
            onAddClick(){
                this.doShowDialog({dialog: Dial.TRUNK});
            },
            openOtherTree(){
                this.doShowDialog({dialog: Dial.COMPARE_TO});
            }
        },
        computed: {
            ...mapState(['tree', 'compareTo'])
        }
    }
</script>