<template>
    <selectable-list :items="items" :maxSelectionSize="1" :selection="selection">
        <template slot="bar" slot-scope="{ s }">
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat dense @click="goEquiv(s.oneSelected)">Equivalence<v-icon>arrow_right_alt</v-icon><v-icon>search</v-icon></v-btn>
                    <span style="pointer-events: none">Trouver des équivalences</span>
                </v-tooltip>
            </v-toolbar-items>
            <v-spacer/>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" icon dense @click="s.unselect()"><v-icon>close</v-icon></v-btn>
                    <span style="pointer-events: none">Fermer</span>
                </v-tooltip>
            </v-toolbar-items>
        </template>
        <open-message slot="no-items" :section="section"/>
    </selectable-list>
</template>

<script>
    import {qtUnitName} from "../../services/calculations"
    import SelectableList from "../common/SelectableList"
    import On from "../../const/on"
    import {mapActions} from 'vuex'
    import OpenMessage from "../common/OpenMessage"

    export default {
        components: {
            OpenMessage,
            SelectableList,
        },
        props: ['tree','selection'],
        computed: {
            items: function () {
                return this.tree && this.tree.impactsTank
            },
            section: function () {
                return {
                    title: `"${this.tree.trunk && this.tree.trunk.name}" ne contient pas encore d'impact sur l'environnement. Une idée?`,
                    filter: {
                        type: 'trunk-impact',
                        topicId: this.tree._id
                    }
                }
            }
        },
        methods: {
            qtUnitName,
            ...mapActions({dispatchGoEquiv: On.GO_EQUIV}),
            goEquiv(impact) {
                this.dispatchGoEquiv({
                    _id: this.tree._id,
                    bqt: this.tree.trunk.quantity.bqt,
                    s_id: impact._id,
                    sbqt: impact.quantity.bqt
                })
            }
        },
    }
</script>