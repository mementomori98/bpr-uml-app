<script lang="ts">
    export let href: string = '/logout';

    const hashHref = () => {
        if (href.startsWith('/'))
            return `#${href}`;
        return `/#/${href}`;
    }

</script>

<a href={hashHref()} class="nav-link">
    <slot/>
</a>

<style lang="scss">
    @import "./theme";

    .nav-link {
        width: 100%;
        text-decoration: none;
        padding: 8px 24px;
        font: $font-nav;
        text-transform: uppercase;
        color: nth($drawer, 2);
        user-select: none;

        &:hover {
            background-color: rgba(black, 0.04);
        }
    }

</style>