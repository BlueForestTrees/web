<template>
    <v-layout row wrap justify-center align-center id="ressource_stack">
        <template v-for="(item,i) in viewPath">
            <v-flex v-if="up">
                <v-icon large>keyboard_arrow_up</v-icon>
            </v-flex>
            <v-flex>
                <item :item="item" :selected="i === selectedViewIndex"
                      @configure="configure(i)" @select="select(i)" @load="load(i)" @remove="remove(i)"
                />
            </v-flex>
            <v-flex v-if="down">
                <v-icon large>keyboard_arrow_up</v-icon>
            </v-flex>
        </template>
    </v-layout>
</template>

<script>
    import {Dial} from "../../const/dial";
    import Do from "../../const/do";
    import {mapMutations, mapActions} from 'vuex';
    import Item from "./Item";
    import On from "../../const/on";

    export default {
        components: {Item},
        name: 'item-path',
        props: {
            path: Array,
            up: Boolean
        },
        computed: {
            down: function () {
                return !this.up;
            },
            viewPath: function () {
                return this.down ? this.path : this.path.slice().reverse();
            },
            selectedViewIndex: function () {
                if (this.path.length > 1) {
                    return this.pathIndex(this.path.length - 1);
                } else {
                    return -1;
                }
            }
        },
        methods: {
            ...mapActions({
                dispatchDeleteLink: On.DELETE_LINK,
            }),
            ...mapMutations({showDialog: Do.SHOW_DIALOG}),
            pathIndex(i) {
                return this.down ? i : this.path.length - i - 1;
            },
            leftRight(i) {
                return {
                    left: this.viewPath[this.up ? i : i - 1],
                    right: this.viewPath[this.up ? i + 1 : i]
                }
            },
            configure(viewIndex) {
                this.showDialog({
                    dialog: Dial.CONFIGURE_LINK,
                    data: this.leftRight(viewIndex)
                });
            },
            select(viewIndex) {
                const pathIndex = this.pathIndex(viewIndex);
                this.path.splice(pathIndex + 1);
                this.$emit('select', this.path[pathIndex]);
            },
            load(viewIndex) {
                this.$emit('load', this.viewPath[viewIndex]);
            },
            remove(viewIndex) {
                this.dispatchDeleteLink(this.leftRight(viewIndex));
                this.$emit('remove');
                this.path.splice(this.pathIndex(viewIndex));
            }
        }
    }
</script>