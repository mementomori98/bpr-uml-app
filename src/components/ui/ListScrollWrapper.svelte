<script lang="ts">
    import {CssBuilder} from "./CssBuilder";
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
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    border-top: 0;

    &--full-border {
      border-top: 0.5px solid rgba(0, 0, 0, 0.2);
    }

    &--disabled-border {
      border: 0;
    }
  }
</style>