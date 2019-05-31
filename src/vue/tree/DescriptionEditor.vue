<template>
    <v-container ma-0 pa-0>
        <editor v-model="editing" class="full-width"
                :initial="initial" :changes="changes" :editor="editor"
                @change="change"
        />
        <saver slot="bottom" v-if="!editing" updated-text="Mise à jour effectuée."
               :initial="initial" :changes="changes" :final="final" :editor="editor"
               :update-action="On.UPDATE_TRUNK"
               @saved="saved" no-copy no-delete
        />
    </v-container>
</template>

<script>
    import Editor from "../common/Editor"
    import Connected from "../mixin/Connected"
    import Edition from "../editor/Edition"
    import Saver from "../editor/Saver"
    import On from "../../const/on"

    export default {
        name: "DescriptionEditor",
        components: {Saver, Editor},
        props: ['value'],
        mixins: [Connected, Edition],
        data: () => ({On}),
        computed: {
            editor() {
                return [
                    {key: "name", title: "Nom", editor: "textarea-editor", props: {maxLength: 50}, optional: true},
                    {key: "origin", title: "Origine", editor: "textarea-editor", props: {maxLength: 200, label: "Pourquoi créer ce produit?"}, optional: true},
                    {key: "source", title: "Source", editor: "textarea-editor", props: {maxLength: 300, label: "Lien http valide vers une source"}, optional: true},
                    {key: "comment", title: "Commentaire", editor: "textarea-editor", props: {maxLength: 20000}, optional: true},
                ]
            },
        },
        methods: {
            saved(changes) {
                this.$emit('saved', changes)
            }
        },
        created() {
            this.setInitial(this.value)
        },
        watch: {
            value() {
                this.setInitial(this.value)
            },
            '$route'(to, from) {
                this.setInitial(this.value)
            }
        }
    }
</script>