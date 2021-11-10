<script lang="ts">
    import {CssBuilder} from "../utils/CssBuilder";

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
    padding: 14px 32px;
    cursor: pointer;

    &--header {
      font-weight: 800;
      padding: 0 32px;
      min-height: 48px;
      cursor: default;
      background-color: #b8f3ff3b;
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
    border-bottom: 1px solid rgba(0, 0, 0, .08);

    &--header {
      border: none;
    }

    &--no-border {
      border: none;
    }
  }

</style>