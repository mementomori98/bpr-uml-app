<script lang="ts">
    import {CssBuilder} from "./CssBuilder";

    export let isHeader: boolean = false;
    export let isHighlighted: boolean = false;
    export let noFunction: boolean = false;
    export let noBorder: boolean = false;
    export let style: string = "";

    $: wrapper = new CssBuilder('row')
        .addFeature('header', isHeader)
        .addFeature('useless', noFunction)
        .addFeature('highlighted', isHighlighted)
        .build();
    $: dividerStyle = new CssBuilder('divider')
        .addFeature('header', isHeader)
        .addFeature('no-border', noBorder)
        .build();
</script>

<div class={wrapper} style={style} on:click>
    <slot/>
</div>
<div class={dividerStyle}/>

<style lang="scss">
  @import "../theme.scss";

  .row {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 14px;
    cursor: pointer;

    &--header {
      font-weight: 800;
      padding: 0 14px;
      min-height: 48px;
      cursor: default;
      background-color: #f5f5f5;
      border: 2px solid #e8e8e8;
      border-bottom: 0;

    }

    &--useless {
      cursor: default;
    }

    &--highlighted {
      background-color: #6f76ff21;
      font-weight: 800;
    }
  }
  .divider {
    border-bottom: 1px solid rgba(0, 0, 0, .2);

    &--header {
      border-bottom: 2px solid #c4c4c4;
    }

    &--no-border {
      border: none;
    }
  }

</style>