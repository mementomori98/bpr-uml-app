<script lang="ts">

    import {Colors} from "./utils/Colors";
    import {CssBuilder} from "./utils/CssBuilder";
    import {createEventDispatcher} from "svelte";

    export const color: Colors = Colors.Blue;
    export let disabled: boolean = false;
    const dispatch = createEventDispatcher();

    $: style = new CssBuilder('close')
        .build();
    const onClick = (e) => {
        e.stopPropagation()
        dispatch('click');
    }
</script>

<button disabled={disabled} on:click={onClick} class={style + " close:after__disabled"}/>

<style lang="scss">
  @import "../ui/theme";

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

    &:disabled {
      cursor: default;
      background: none;
    }

    &:before, &:after {
      position: absolute;
      top: 25%; left: calc(50% - .0625em);
      width: .125em; height: 50%;
      border-radius: .125em;
      transform: rotate(45deg);
      background: #606060;
      content: '';

    }
    &:disabled::before, &:disabled::after{
      background: #cccccc;

    }
    &:after { transform: rotate(-45deg); }
  }
</style>