<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";

    export let borderSize: number = 0;
    export let noMargin: boolean = false;
    export let borderColor: string = 'white';
    export let style: string = '';

    $: cardClass = new CssBuilder('card')
        .addFeature('no-margin', noMargin)
        .build();
</script>

<div class={cardClass} style={`border: ${borderSize}px solid #${borderColor}; ${style}`}>
    <slot/>
</div>

<style lang="scss">
    @import "./theme";

    .card {
        width: 100%;
        min-width: 350px;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
        border-radius: 8px;
        background-color: white;
        margin-bottom: 32px;

      &--no-margin{
        margin: 0;
      }
    }

</style>