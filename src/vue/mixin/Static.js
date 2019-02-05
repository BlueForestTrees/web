export default {
    beforeCreate() {
        const vue_static = this.$options.static

        if (vue_static && typeof (vue_static) === 'function') {
            Object.assign(this, vue_static.apply(this))
        } else if (vue_static && typeof (vue_static) === 'object') {
            Object.assign(this, vue_static)
        }
    }
}