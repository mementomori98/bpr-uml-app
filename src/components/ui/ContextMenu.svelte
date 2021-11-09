<script lang="ts">
    import {fade} from 'svelte/transition';
    import {CssBuilder} from "./utils/CssBuilder";

    export let visible: boolean = false;
    export let noPadding: boolean = false;
    export let left: number = null;
    export let top: number = null;
    export let right: number = null;
    export let bottom: number = null;

    let width: number;
    let height: number;


    $: style = `
    ${left == null ? '' : 'left: ' + left + 'px;'}
    ${top == null ? '' : 'top: ' + top + 'px;'}
    ${right == null ? '' : 'right: ' + right + 'px;'}
    ${bottom == null ? '' : 'bottom: ' + bottom + 'px;'}`

    $: menuStyle = new CssBuilder('context-menu')
        .addFeature('no-padding', noPadding)
        .build();

    const handleOverlayClick = e => {
        visible = false;
        e.stopPropagation();
    }
</script>

{#if visible}
    <div class="context-menu__overlay" on:click={handleOverlayClick}/>
    <div in:fade={{duration: 50}} out:fade={{duration: 50}}
         class={menuStyle}
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

      &--no-padding{
        padding: 0;
      }

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