<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let dispatch = createEventDispatcher();
</script>

<div class="fab" on:click={() => dispatch('click')}>
    <slot/>
</div>

<style lang="scss">
    @import "../theme.scss";

    .fab {
        position: fixed;
        right: 32px;
        bottom: 32px;
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        z-index: 500;
        box-shadow: $shadow-medium;
        user-select: none;
        cursor: pointer;
        transition-duration: 100ms;
        font-size: 20px;

        background-color: nth($blue, 1);
        color: nth($blue, 2);
        border: 1px solid darken(nth($blue, 1), 10%);

        &:hover {
            box-shadow: $shadow-large;
        }

        &:active {
            box-shadow: $shadow-medium;
        }
    }
</style>