<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher()
</script>

<div class="text-button" on:click={() => dispatch('click')}>
    <slot/>
</div>

<style lang="scss">
    @import "../theme.scss";

    .text-button {
        background-color: inherit;
        user-select: none;
        cursor: pointer;
        padding: 8px 16px;
        color: black;
        border-radius: $border-radius-medium;

        &:hover {
            background-color: rgba(black, 0.03);
        }

        &:active {
            background-color: rgba(black, 0.05);
        }
    }
</style>