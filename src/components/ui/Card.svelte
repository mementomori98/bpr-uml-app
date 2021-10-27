<script lang="ts">
    export let borderSize: number
    export let borderColor: string
</script>

<div class="card" style={`border: ${borderSize}px solid #${borderColor};`}>
    <slot/>
</div>

<style lang="scss">
    @import "../theme.scss";

    .card {
        width: 100%;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
        border-radius: 8px;
        background-color: white;
    }

    :global(.card + .card) {
        margin-top: 32px;
    }
</style>