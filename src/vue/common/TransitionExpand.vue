<template>
    <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
        <slot/>
    </transition>
</template>

<script>
    export default {
        name: 'TransitionExpand',
        methods: {
            afterEnter(element) {
                element.style.height = 'auto'
            },
            enter(element) {
                const width = getComputedStyle(element).width

                element.style.width = width
                element.style.position = 'absolute'
                element.style.visibility = 'hidden'
                element.style.height = 'auto'

                const height = getComputedStyle(element).height

                element.style.width = null
                element.style.position = null
                element.style.visibility = null
                element.style.height = 0

                setTimeout(() => {
                    element.style.height = height
                })
            },
            leave(element) {
                element.style.height = getComputedStyle(element).height
                setTimeout(() => {
                    element.style.height = 0
                })
            },
        },
    }
</script>