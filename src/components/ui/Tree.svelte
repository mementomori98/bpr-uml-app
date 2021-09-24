<script lang="ts">
    import Icon from "./Icon.svelte";

    export let text = '';
    export let open: boolean;

    const handleClick = function () {
        open = !open;
    }
</script>

<div class="tree">
    <div class="tree__text" on:click={handleClick}>
        <div class="tree__text-icon">
            {#if open && $$slots.default}
                <Icon icon="keyboard_arrow_down"/>
            {:else if !open && $$slots.default}
                <Icon icon="keyboard_arrow_right"/>
            {/if}
        </div>
        {text}
    </div>
    <div class="tree__children" hidden={!open}>
        <slot/>
    </div>
</div>

<style lang="scss">

    .tree {
        padding-top: 4px;
        width: 100%;

        &__text {
            display: flex;
            cursor: pointer;
            user-select: none;
        }

        &__text-icon {
            width: 24px;
        }
    }

    :global(.tree.tree) {
        padding-left: 16px;
    }

</style>