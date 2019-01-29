<template>
    <impact-adder v-if="modeAdd" :tree="tree" :selection="selection"/>
    <v-card v-else>
        <v-container>
            <div class="display-1 font-weight-thin">Impacts sur l'environnement</div>
        </v-container>
        <selectable-list :items="items" :maxSelectionSize="1" :selection="selection">
            <template slot="no-items">
                <v-layout class="align-center justify-center my-5 font-weight-thin title"><img src="/img/broken-heart.svg" class="logo-petit ma-1"/>Pas encore d'informations sur les impacts</v-layout>
            </template>
        </selectable-list>
        <open-message :section="section"/>
    </v-card>
</template>

<script>
    import SelectableList from "../common/SelectableList"
    import OpenMessage from "../common/OpenMessage"
    import ImpactAdder from "../impact/ImpactAdder"

    export default {
        name: "impacts-subpage",
        components: {
            ImpactAdder,
            OpenMessage,
            SelectableList,
        },
        props: ['tree', 'selection', 'modeAdd'],
        computed: {
            items() {
                return this.tree && this.tree.impactsTank
            },
            section() {
                return {
                    title: `Participer`,
                    filter: {
                        type: 'impact.trunk',
                        topicId: this.tree._id
                    }
                }
            }
        }
    }
</script>