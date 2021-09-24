<script lang="ts">

    export let href: string = "/";

    const hashHref = () => {
        if (href.startsWith('/'))
            return `#${href}`;
        return `/#/${href}`;
    }

</script>

<a href={hashHref()}>
    <slot/>
</a>

<style lang="scss">
    @import "../theme.scss";
</style>