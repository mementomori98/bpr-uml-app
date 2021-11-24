<script lang="ts">
    export let width: number = 1024;
    export let bgColor: string = "ededed"
    export let verticalCentering: boolean = false;
</script>

<div class="center__wrapper" style={`align-items: ${verticalCentering ? 'center' : 'normal'};`}>
    <div class="center__content" style={`width: ${width}px;`}>
        <slot/>
    </div>
</div>

<style lang="scss">
    @import "../ui/theme";

    .center__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $page-bg;
    }

    .center__content {
        background-color: $page-bg;
        max-width: 80%;
    }
</style>