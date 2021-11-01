<script lang="ts">

    import {Colors} from "./Colors";
    import {CssBuilder} from "./CssBuilder";

    export let color: Colors = Colors.Blue;

    $: style = new CssBuilder('close')
        .build();

</script>

<button on:click class={style}>close</button>

<style lang="scss">
  @import "../theme.scss";

  .close {
    overflow: hidden;
    position: relative;
    margin-bottom: auto;
    margin-top: auto;
    border: none;
    padding: 0;
    width: 1.5em; height: 1.5em;
    border-radius: 25%;
    background: transparent;
    color: #3f3f3f;
    font: inherit;
    text-indent: 100%;
    cursor: pointer;

    &:focus {
      outline: solid 0 transparent;
      box-shadow: 0 0 0 1.5px rgba(95, 98, 98, 0.1)
    }

    &:hover {
      background: rgba(145, 150, 150, 0.1)
    }

    &:before, &:after {
      position: absolute;
      top: 25%; left: calc(50% - .0625em);
      width: .125em; height: 50%;
      border-radius: .125em;
      transform: rotate(45deg);
      background: #606060;
      content: ''
    }

    &:after { transform: rotate(-45deg); }
  }
</style>