<template>
    <v-container>
        <v-layout row class="mb-5">
            <div class="display-1 font-weight-thin">Ajouter une ressource</div>
            <v-spacer/>
            <closer @close="$emit('close')"/>
        </v-layout>

        <tree-selection-picker @select="validate" :tree="selectedRoot"/>

    </v-container>
</template>

<script>
    import Closer from "../common/Closer"
    import {name} from "../../services/calculations"
    import QuantityPicker from "../common/QuantityPicker"
    import On from "../../const/on"
    import {mapActions} from "vuex"
    import {GO} from "../../const/go"
    import TreeSelectionPicker from "../tree/TreeSelectionPicker"

    export default {
        name: "ressource-adder",
        props: ['tree'],
        components: {TreeSelectionPicker, QuantityPicker, Closer},
        data: () => ({
            selectedRoot: null,
            GO
        }),
        methods: {
            name,
            ...mapActions({
                addToTree: On.ADD_ROOT,
                snack: On.SNACKBAR
            }),
            validate(root) {
                this.addToTree({tree: this.tree, root})
                    .then(() => {
                        this.$emit('close')
                        this.snack({text: "1 ressource ajoutée", color: "green"})
                    })
                    .catch(e => {
                        this.snack({text: e.message, color: "orange"})
                        console.error(e)
                    })
            }
        }
    }
</script>