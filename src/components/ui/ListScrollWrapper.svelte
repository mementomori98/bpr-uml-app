<script lang="ts">
    import {CssBuilder} from "./CssBuilder";
    import {isHeader, noBorder} from "./ListRow.svelte";

    export let style: string = "";
    export let maxHeight: number;
    export let disabledBorder: boolean = false;

    $: wrapperStyle = new CssBuilder('wrapper')
        .addFeature('disabled-border', disabledBorder)
        .build();
</script>

<div style="margin: 0 -32px">
    <slot name="header"/>
</div>

<div class={wrapperStyle} style={`max-height: ${maxHeight}px; ${style};`}>
    <slot/>
</div>

<style lang="scss">
  @import "../theme.scss";

  .wrapper{
    max-height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
    border-bottom: 2px solid #d5d5d591; //was border:
    border-top: 2px solid #d5d5d591;
    margin: 0 -32px;

    &--disabled-border {
      border: 0;
    }
  }
</style>