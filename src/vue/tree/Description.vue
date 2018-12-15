<template>
    <table>
        <tbody>
        <tr>
            <td colspan="2">
                <photo :trunk="trunk"/>
            </td>
        </tr>
        <tr>
            <th class="width-20">Propriétaire:</th>
            <td><a :href="owner.site" target="_blank">{{owner.fullname}}</a></td>
        </tr>
        <tr>
            <th>Source:</th>
            <td>
                <a v-if="isOff" :href="`https://world.openfoodfacts.org/product/${code}`">voir site</a>
                <span v-else>{{origin}}</span>
            </td>
        </tr>
        <tr>
            <th>Code:</th>
            <td>{{code}}</td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    const Photo = () => import(/* webpackChunkName: "Photo" */ "../common/Photo")

    export default {
        components: {Photo},
        props: ['tree'],
        computed: {
            isOff() {
                return this.origin === "off"
            },
            origin() {
                return this.trunk && this.trunk.origin
            },
            trunk() {
                return this.tree && this.tree.trunk
            },
            code() {
                return this.trunk && this.trunk.externId
            },
            owner() {
                return this.tree && this.tree.owner
            }
        }
    }
</script>