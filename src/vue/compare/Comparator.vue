<template>
    <div>
        <v-divider/>
        <axis-list :items="analysed && analysed.left" :selection-key="`compare-left-${fragment}`" :coef="leftCoef"/>
        <v-divider v-if="analysed && analysed.left && analysed.left.length"/>
        <v-layout row>
            <v-spacer/>
            <axis-list :items="analysed && analysed.right" :selection-key="`compare-left-${fragment}`" :coef="rightCoef"/>
        </v-layout>
        <v-divider v-if="analysed && analysed.right && analysed.right.length"/>
        <double-axis-list :items="analysed && analysed.common" :leftCoef="leftCoef" :rightCoef="rightCoef"/>
    </div>
</template>

<script>
    import {separate, toAxis} from "../../services/axis"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import Loader from "../loader/Loader"
    import FragmentList from "../tree/FragmentList"
    import AxisList from "./AxisList"
    import DoubleAxisList from "./DoubleAxisList"

    export default {
        name: 'comparator',
        components: {DoubleAxisList, AxisList, FragmentList, Loader},
        props: {
            visible: {type: Boolean, required: true},
            left: Object,
            right: Object,
            fragment: String
        },
        data: () => ({
            leftAxis: null,
            rightAxis: null
        }),
        methods: {
            ...mapActions({
                getFragment: On.GET_FRAGMENT,
                snackError: On.SNACKERROR
            }),
            getAxis(tree) {
                return tree && this.fragment
                    && this.getFragment({tree, fragment: this.fragment})
                        .then(toAxis)
                        .catch(this.snackError)
            }
        },
        asyncComputed: {
            leftAxis() {
                return this.getAxis(this.left)
            },
            rightAxis() {
                return this.getAxis(this.right)
            }
        },
        computed: {
            analysed() {
                return this.leftAxis && this.rightAxis && separate(this.leftAxis, this.rightAxis)
            },
            leftCoef() {
                return this.left && this.left.coef || 1
            },
            rightCoef() {
                return this.right && this.right.coef || 1
            }
        }
    }
</script>