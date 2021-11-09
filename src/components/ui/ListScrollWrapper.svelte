<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";
    import {isHeader, noBorder} from "./ListRow.svelte";

    export let style: string = "";
    export let maxHeight: number;
    export let fullBorder: boolean = false;
    export let disabledBorder: boolean = false;

    $: wrapperStyle = new CssBuilder('wrapper')
        .addFeature('full-border', fullBorder)
        .addFeature('disabled-border', disabledBorder)
        .build();
</script>

<div class={wrapperStyle} style={`max-height: ${maxHeight}px; ${style};`}>
    <slot/>
</div>

<style lang="scss">
  @import "../theme.scss";

  .wrapper{
    max-height: 280px;
    overflow-y: auto;
    border: 2px solid #e8e8e8;
    border-top: 0;

    &--full-border {
      border-top: 2px solid #e8e8e8;
    }

    &--disabled-border {
      border: 0;
    }
  }
</style>