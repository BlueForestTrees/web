<template>
    <panel :title="title" @close="$emit('close')">
        <icon slot="left" :icon-class="iconClass" class="mr-3" style="margin-left:6px;margin-top:17px"/>

        <entries-list v-if="selectEntryState" @select="selectEntry" :action="action"/>
        <template v-else-if="selectEntryBqtState">
            <v-layout column justify-center align-center my-3>
                {{name(value)}}
                <quantity-picker dense can-no-qt class="not-too-half"
                                 :value="value"
                                 @input="selectQuantity" @close="back()"
                ></quantity-picker>
            </v-layout>
        </template>
        <a v-else-if="valueOkState" @click="back">{{qtUnitName(value)}}</a>
    </panel>
</template>

<script>
    import EntryList from "../common/EntryList"
    import On from "../../const/on"
    import Panel from "./Panel"
    import Icon from "../common/icon"
    import QuantityPicker from "../common/QuantityPicker"
    import {qtUnitName, name} from "../../services/calculations"

    export default {
        name: "facet-panel",
        props: ['value', 'title', 'iconClass', 'action'],
        components: {QuantityPicker, Icon, Panel, EntriesList: EntryList},
        data: function () {
            return {On, qtPicked: false}
        },
        methods: {
            qtUnitName, name,
            selectEntry(v) {
                this.emitInput(v)
            },
            selectQuantity(quantity) {
                if (quantity) {
                    this.emitInput({...this.value, bqt: quantity.bqt})
                } else {
                    this.emitInput({...this.value, bqt: undefined})
                }
                this.qtPicked = true
            },
            emitInput(v) {
                this.$emit("input", v)
            },
            back() {
                if (this.valueOkState) {
                    this.emitInput({...this.value, bqt: undefined})
                    this.qtPicked = false
                } else if (this.selectEntryBqtState) {
                    this.emitInput(null)
                }
            }
        },
        computed: {
            selectEntryState() {
                return !this.value || !this.value._id
            },
            selectEntryBqtState() {
                return !this.qtPicked
            },
            valueOkState() {
                return !this.selectEntryBqtState
            },
        }
    }
</script>
