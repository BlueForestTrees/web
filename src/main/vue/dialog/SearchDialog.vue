<template>
    <main-dialog :dialog="Dial.SEARCH" :title="'Recherche'" ref="dialog"
                 @esc="close" @enter="validate" @focus="focus"
    >
        <v-form v-model="valid" v-on:submit.prevent="" ref="form">
            <v-select
                    label="Nom..." ref="nom"
                    autocomplete required cache-items
                    :loading="loading"
                    :items="autocompleteItems"
                    :search-input.sync="itemNamepart"
                    v-model="selectedItemId"
                    item-text="trunk.name" item-value="_id"
                    :rules="[required]"
            ></v-select>
        </v-form>

    </main-dialog>
</template>
<script>
    import {mapActions} from "vuex";
    import On from "../../const/on";
    import {Dial} from "../../const/dial";
    import closable from "../mixin/Closable";
    import {required} from "../../services/rules";
    import MainDialog from "./MainDialog";

    export default {
        name: "search-dialog",
        components: {MainDialog},
        mixins: [closable],
        data() {
            return {
                Dial,
                itemNamepart: null,
                autocompleteItems: [],
                loading: false,
                selectedItemId: null,
                valid: false
            }
        },
        watch: {
            itemNamepart(val) {
                this.loading = true;
                this.search(val);
                this.loading = false;
            }
        },
        methods: {
            ...mapActions({
                dispatchSearch: On.SEARCH_TREE,
                dispatchOpen: On.LOAD_OPEN_TREE
            }),
            focus() {
                this.$refs.form.reset();
                this.autocompleteItems = [];
            },
            async search(term) {
                if (term) {
                    this.autocompleteItems = await this.dispatchSearch({term});
                }
            },
            validate() {
                this.$refs.form.validate();
                if (this.valid) {
                    this.dispatchOpen({_id: this.selectedItemId});
                    this.close();
                }
            },
            required
        }
    }
</script>