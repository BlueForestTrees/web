<template>
    <div id="command">
        <button class="mdc-button mdc-button--raised" @click="triggerPurge()">
            Purge
        </button>
        <button class="mdc-button mdc-button--raised" @click="listAll()">
            List all
        </button>
    </div>
</template>

<script>
    import {TRIGGER_PURGE,LIST_ALL} from 'mutations'
    import {mapActions} from 'vuex'

    export default {
        name: "command",
        methods: {
            ...mapActions([TRIGGER_PURGE,LIST_ALL])
        }
    }
</script>