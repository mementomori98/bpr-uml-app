<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher()
</script>

<div class="option" on:click={() => dispatch('click')}>
    <slot/>
</div>

<style lang="scss">
    @import "../ui/theme";

    .option {
        padding: 14px 16px;
        background-color: transparent;
        cursor: pointer;
        user-select: none;
        text-transform: uppercase;
        font: $font-option;

        &:hover {
            background-color: rgba(black, 0.03);
        }
    }

</style>