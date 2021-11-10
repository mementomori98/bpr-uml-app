<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {CssBuilder} from "./utils/CssBuilder";

    const dispatch = createEventDispatcher()

    export let noPadding: boolean = false;

    $: className = new CssBuilder('text-button')
        .addFeature('no-padding', noPadding)
        .build();
</script>

<div class={className} on:click={() => dispatch('click')}>
    <slot/>
</div>

<style lang="scss">
    @import "../ui/theme";

    .text-button {
        background-color: inherit;
        user-select: none;
        cursor: pointer;
        padding: 8px 16px;
        border-radius: $border-radius-medium;

        &--no-padding {
            padding: 4px;
        }

        &:hover {
            background-color: rgba(black, 0.03);
        }

        &:active {
            background-color: rgba(black, 0.05);
        }
    }
</style>