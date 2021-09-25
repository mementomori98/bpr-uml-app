<script lang="ts">
    export let visible: boolean = false;
    export let x: number;
    export let y: number;

    let width: number;
    let height: number;

    $: style = `
        left: ${x}px;
        top: ${y}px;`;

    const handleOverlayClick = e => {
        visible = false;
        e.stopPropagation();
    }
</script>

{#if visible}
    <div class="context-menu__overlay" on:click={handleOverlayClick}/>
    <div class="context-menu"
         style="{style}"
         bind:clientWidth={width}
         bind:clientHeight={height}
         on:click={handleOverlayClick}
         on:mousedown={e => e.stopPropagation()}
         on:mouseup={e => e.stopPropagation()}>
        <slot/>
    </div>
{/if}

<style lang="scss">
    @import "../theme.scss";

    .context-menu {
        color: black;
        position: fixed;
        box-shadow: $shadow-medium;
        border-radius: $border-radius-small;
        cursor: auto;
        user-select: text;
        z-index: 510;
        min-width: 160px;
        padding: 12px 0;
        background-color: white;

        &__overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            cursor: default;
            z-index: 509;
        }
    }
</style>