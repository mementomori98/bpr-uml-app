<script lang="ts">
    import {CssBuilder} from "../utils/CssBuilder";

    export let small: boolean = false

    $: wrapperStyle = new CssBuilder('icon')
        .addFeature('small', small)
        .build();
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>
<i class="fa fa-envelope {wrapperStyle}"></i>

<style lang="scss">
  @import "../theme.scss";

  .icon{
    color: #ff0000;
    font-size: 16px;

    &--small{
      font-size: 10px;
    }
  }
</style>