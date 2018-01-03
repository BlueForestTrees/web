<template>
    <main-dialog :dialog="Dial.LOOKUP_TREE" @focus="$refs.textfield.focus()" @validate="validate" ref="dialog">

    </main-dialog>
</template>

<script>
    export default {
        name:'lookup-tree-dialog'
    }
</script>