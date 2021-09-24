<script lang="ts">
    import Card from "./Card.svelte";

    export let width: number = 480;
</script>

<div class="center__wrapper">
    <div class="center__content" style={`width: ${width}px`}>
        <Card>
            <slot/>
        </Card>
    </div>
</div>

<style lang="scss">
    @import "../theme.scss";

    .center__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ededed;
    }

    .center__content {
        max-width: 80%;
    }
</style>