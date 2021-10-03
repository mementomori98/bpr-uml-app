<script lang="ts">
    export let width: number = 1024;
    export let bgColor: string = ""
    export let verticalCentering: boolean = false;
</script>

<div class="center__wrapper" style={`background-color: #${bgColor}; align-items: ${verticalCentering ? 'center' : 'normal'};`}>
    <div class="center__content" style={`width: ${width}px;`}>
        <slot/>
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
  }

  .center__content {
    max-width: 80%;
  }
</style>