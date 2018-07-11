<template>
    <span>
        <v-text-field
                label="Nom" autofocus
                v-model="namePart"
        />

        <v-list>
            <v-list-tile v-for="item in items" :key="item._id" @click="select(item)">
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
    import {GO} from "../const/go";

    export default {
        name: "search",
        data() {
            return {
                Dial,
                busy: false,
                namePart: null,
                items: null
            }
        },
        computed: {
            query: function () {
                return {
                    namePart: this.namePart,
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
                select: On.SELECT_SEARCH
            })
        }
    }
</script>