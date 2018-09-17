<template>
    <v-container>

        <div>


            <div style="position:fixed;right:0em;top:0em;background-color: #FFFFFFDE">
                <div style="margin-right:2em;margin-top:2em">
                    <ul>
                        <a href="#c" class="body-2 mb-1 d-block grey--text text--darken-1">Constat</a>
                        <a href="#b" class="body-2 mb-1 d-block grey--text text--darken-1">Besoin</a>
                        <a href="#f" class="body-2 mb-1 d-block grey--text text--darken-1">Fonction</a>
                        <a href="#t" class="body-2 mb-2 d-block grey--text text--darken-1">Technique</a>
                    </ul>
                </div>
            </div>

            <div class="main">
                <div id="c">
                    <h1 class="display-3 font-weight-thin">Constat</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et aliquet velit, sit amet posuere neque. Maecenas tincidunt mauris a sem facilisis ullamcorper. Donec varius, enim sed dignissim varius, nulla mauris maximus ipsum, vitae consectetur libero nulla quis sapien. Duis porttitor quam nec ligula imperdiet, id laoreet massa mattis.
                        Curabitur lobortis sagittis nunc, nec eleifend nisi cursus ac. Praesent finibus id nisi et viverra. Duis et sollicitudin mi. Maecenas aliquam ex in orci congue sodales. Curabitur commodo nisl eu elit rhoncus, feugiat consequat leo commodo. Suspendisse sed dolor eu sapien dapibus imperdiet. Pellentesque lobortis iaculis velit vitae
                        hendrerit. Aliquam sed ex magna. Nulla sagittis quam velit, lobortis tempus quam pulvinar tempor. Nam eget lectus id leo tempus aliquet. Etiam tempor dignissim consequat.
                        <v-icon color="primary" @click="showMessages(c1)">chat_bubble</v-icon>
                    </p>
                    <p>
                        Nulla viverra pretium lorem pulvinar convallis. Proin dictum vestibulum metus, quis lacinia justo. Nullam non purus commodo arcu placerat condimentum. Nulla facilisi. Ut congue dignissim urna, iaculis aliquet magna commodo et. Aliquam a tempus augue. Phasellus lectus dui, malesuada mollis nunc non, pretium convallis lorem. Mauris orci
                        massa, varius aliquet tincidunt ac, mollis consectetur nibh. Vestibulum sed elit vel quam aliquam dapibus in in sem. Quisque maximus lectus quis nisi ultrices, quis ultrices ante eleifend. Duis vitae dolor id diam luctus blandit eget ut est. Quisque quis neque sed nisl dignissim placerat. In id nisi eget tortor malesuada viverra. In
                        hac
                        habitasse platea dictumst.
                        <v-icon color="primary" @click="showMessages(c2)">chat_bubble</v-icon>
                    </p>
                </div>
                <div id="b">
                    <h1 class="display-3 font-weight-thin">Besoin</h1>
                    <p>
                        Quisque sed enim et est eleifend facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Ut a velit nisi. Donec lobortis lorem ac ipsum porta blandit. Etiam quis lorem vulputate, mollis odio ut, venenatis tellus. Quisque pellentesque dolor odio, ac dignissim felis
                        convallis
                        quis. Pellentesque odio arcu, sagittis et massa vel, sodales placerat diam. Donec convallis nisi ligula, et elementum elit elementum vel. Donec iaculis sagittis dolor, sed auctor leo interdum nec. Nunc ac sagittis massa. Nulla non nunc sit amet libero blandit gravida a vel eros. Cras viverra odio sed nulla commodo consectetur.
                        <v-icon color="primary" @click="showMessages(b1)">chat_bubble</v-icon>
                    </p>
                    <p>
                        Suspendisse potenti. Cras a ligula ac arcu tempor pretium. Duis auctor sapien leo, ac congue dolor dapibus id. Phasellus dictum sapien eu mattis mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent posuere, turpis sed elementum efficitur, odio nulla tristique odio, et lobortis ligula
                        leo
                        in purus. Nunc dignissim tempor quam, vel luctus orci condimentum vel. Phasellus porta tincidunt orci, vehicula mollis ligula pellentesque a. Integer varius arcu euismod neque consectetur varius. Suspendisse bibendum nulla ac felis varius, sed aliquam justo hendrerit. Donec consectetur rutrum consequat. Sed non auctor ligula. In
                        aliquam
                        odio at nulla vestibulum pulvinar.
                        <v-icon color="primary" @click="showMessages(b2)">chat_bubble</v-icon>
                    </p>
                </div>
                <div id="f">
                    <h1 class="display-3 font-weight-thin">Fonction</h1>
                    <p>
                        Aenean mattis sit amet purus a posuere. Nulla maximus nec libero et bibendum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sit amet nulla eget lectus interdum auctor sit amet non tellus. Mauris rhoncus commodo turpis, id bibendum libero fringilla ac. Vestibulum ante ipsum primis
                        in
                        faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus nisl erat, fringilla suscipit elementum ut, congue vel nunc. Phasellus quis dui orci. Nulla condimentum neque non commodo vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed enim lacus.
                    </p>
                    <p>
                        Curabitur scelerisque lorem ante. Aliquam erat volutpat. Nullam sed vehicula elit. Quisque accumsan sit amet eros sed tristique. In eu neque sit amet risus molestie laoreet nec quis nibh. Maecenas sagittis congue finibus. Nulla commodo tortor mi, in porta nibh vulputate quis. Nulla viverra neque vitae varius suscipit. Pellentesque et
                        diam
                        efficitur odio cursus placerat.
                    </p>
                    <p>
                        Aenean at faucibus quam, in bibendum ante. Nulla non gravida risus. Proin bibendum ultricies dignissim. Etiam sit amet euismod elit. Nunc ac mi eros. Morbi et rhoncus lacus, ut euismod libero. Phasellus commodo arcu tincidunt tellus tempus commodo non a turpis. Praesent et risus ac dolor laoreet ultrices vel id erat. Morbi ipsum ex,
                        ornare a iaculis a, vulputate id justo. Curabitur elementum et tortor ut tempus. Sed fermentum orci non hendrerit aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam tincidunt velit non efficitur pulvinar. Donec velit ex, faucibus ut libero id, venenatis scelerisque ipsum. In
                        molestie vel turpis vitae iaculis.
                        <v-icon color="primary" @click="showMessages(f1)">chat_bubble</v-icon>
                    </p>
                </div>
                <div id="t">
                    <h1 class="display-3 font-weight-thin">Technique</h1>
                    <p>
                        Morbi congue sapien ut augue malesuada mattis. Integer vestibulum ligula tincidunt mauris iaculis, non maximus erat lacinia. Integer fringilla risus a est pulvinar gravida. Integer dignissim nisi vitae neque porta, nec tristique lectus lobortis. In suscipit massa neque, quis volutpat nibh fermentum vitae. Orci varius natoque penatibus
                        et
                        magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p>
                        Sed tempus felis erat, vitae tempor mauris efficitur sed. Donec faucibus fermentum semper. Phasellus sit amet dictum nunc. Integer sit amet pretium metus. Nulla ex ex, dictum sit amet massa ut, aliquet blandit tellus. Etiam tincidunt velit id leo malesuada, in congue arcu rhoncus. Sed at elementum ex. Quisque gravida elit vel rhoncus
                        posuere. Vivamus tellus ex, pulvinar sed ipsum sit amet, ullamcorper finibus nisi. Sed sed arcu justo.
                    </p>
                    <p>
                        Nunc eu massa mattis, laoreet ligula id, pharetra leo. Nulla aliquet sem sapien, non pharetra nibh aliquet vel. Aliquam ultrices viverra tristique. Sed quis aliquet arcu. Morbi tristique sit amet ligula tristique bibendum. Integer ex metus, suscipit id convallis quis, convallis non dui. Fusce ante tortor, sollicitudin eget elementum
                        in,
                        molestie eu urna. Aenean magna libero, posuere non sem dignissim, porttitor aliquam turpis. Nulla facilisi.
                    </p>
                    <p>
                        Aenean at rutrum sapien. In sodales auctor rhoncus. Nulla facilisi. Proin mattis et leo nec bibendum. Maecenas ut ex erat. Vivamus at turpis vitae magna finibus pretium quis in nulla. Duis dolor justo, porta in molestie ut, viverra eget libero. Nunc nisl tellus, suscipit quis augue ut, varius cursus nulla. Pellentesque aliquet
                        imperdiet
                        ipsum, eget finibus leo interdum ac. Fusce fringilla enim quis lorem eleifend, in interdum sem laoreet.
                        <v-icon color="primary" @click="showMessages(t1)">chat_bubble</v-icon>
                    </p>
                </div>
            </div>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="$router.push({name:GO.HOME})">terminé</v-btn>
            </v-card-actions>
        </div>

        <right-menu/>
    </v-container>
</template>

<script>
    import RightMenu from "./layout/RightMenu"
    import {GO} from "../const/go"
    import On from "../const/on"
    import {mapActions} from "vuex"
    import Card from "./layout/Card"

    export default {
        name: "plan",
        components: {Card, RightMenu},
        data() {
            return {
                GO,
                c1: {title: "Constat #1", filter: {type: "constat#1"}},
                c2: {title: "Constat #2", filter: {type: "constat#2"}},
                b1: {title: "Besoin #1", filter: {type: "besoin#2"}},
                b2: {title: "Besoin #2", filter: {type: "besoin#2"}},
                f1: {title: "Fonction #1", filter: {type: "fonction#2"}},
                t1: {title: "Technique #1", filter: {type: "Technique#2"}}
            }
        },
        methods: {
            showMessages(filter) {
                this.dispatchShowMessage(filter)
            },
            ...mapActions({dispatchShowMessage: On.SHOW_MESSAGES})
        }
    }
</script>

<style>
    .main {
        margin-top: 4em
    }

    .main div {
        margin-top: 4em
    }

    p {
        margin-left: 1em
    }

    .v-btn__content {
        margin: 0px
    }

    a {
        text-decoration: none;
    }
</style>