<template>
    <span>
        <v-text-field
                label="Nom" ref="nom"
                v-model="namePart"
        />
        <v-autocomplete
                label="Propriétaire"
                v-model="ownerPart"
        />

        <v-list>
            <v-list-tile v-for="item in items" :key="item._id">
                <v-icon :style="'color: '+item.trunk.color+';margin-right:0.2em'">lens</v-icon>
                {{item.trunk.name}}
            </v-list-tile>
        </v-list>
    </span>
</template>

<script>
    import {Dial} from "../const/dial";
    import On from "../const/on";
    import {mapActions} from "vuex";

    export default {
        name: "search",
        data() {
            return {
                Dial,
                busy: false,
                namePart: null,
                ownerPart: null,
                items: null
            }
        },
        computed: {
            query: function () {
                return {
                    namePart: this.namePart,
                    ownerPart: this.ownerPart
                }
            }
        },
        watch: {
            query: async function (q) {
                this.items = await this.dispatchSearch({term: q.namePart});
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
                dispatchOpen: On.LOAD_OPEN_TREE
            }),
            focus() {

                this.$nextTick(() => this.$refs.nom.focus());
            },
            loadMore() {
                console.log("load more")
            }
        }
    }
</script>