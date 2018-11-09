<template>
    <selectable-list :items="items" :maxSelectionSize="1" :selection="selection">
        <open-message class="mt-5" slot="no-items" :section="section"/>
    </selectable-list>
</template>

<script>
    import SelectableList from "../common/SelectableList"
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
                    title: `Les impacts sur l'environnement de ce produit ne sont pas fournis. Indiquez si souhaitez les connaitre.`,
                    filter: {
                        type: 'trunk-impact',
                        topicId: this.tree._id
                    }
                }
            }
        }
    }
</script>