<template>
    <span>
        <a>
            <v-card-title primary-title @click="expended = !expended" style="padding-top: 1em">
                <div class="subheading">{{title}}</div>
                <v-spacer/>
                <v-icon>{{expended ? 'keyboard_arrow_down' : 'keyboard_arrow_left'}}</v-icon>
            </v-card-title>
        </a>
        <v-card-text v-if="expended">
            <slot>
            </slot>
        </v-card-text>
        <v-divider/>
    </span>
</template>

<script>
    export default {
        name:"Expendable",
        props:["title"],
        data:function(){
            return {
                expended:false
            }
        }
    }
</script>