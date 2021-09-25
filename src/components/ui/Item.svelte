<script lang="ts">

    export let size: number = null;

</script>

{#if size}
    <div class="col-lg-{size}">
        <slot/>
    </div>
{:else}
    <div class="col-lg">
        <slot/>
    </div>
{/if}

<style lang="scss">
    @import "../theme.scss";

</style>