<script lang="ts">
    import {CssBuilder} from "./CssBuilder";

    export let widthInPercentage: number = 10;
    export let center: boolean = false;
    export let right: boolean = false;

    $: dividerStyle = new CssBuilder('item')
        .addFeature('center', center)
        .addFeature('right', right)
        .build();
</script>

<div style={`width: ${widthInPercentage}%;`}>
    <slot/>
</div>

<style lang="scss">
  @import "../theme.scss";

  .item{
    &--center{
      text-align: center;
    }
    &--right{
      text-align: right;
    }
  }
</style>