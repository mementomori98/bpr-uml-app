<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";
    import {small} from "./MessageIcon.svelte";
    import {createEventDispatcher} from "svelte";

    export let style: string = '';
    export let title: string = '';
    const dispatch = createEventDispatcher();

    $: itemClass = new CssBuilder('card-item')
        .build();

    $: iconStyle = new CssBuilder('icon')
        .build();

    const itemClick = () => {
        dispatch('click')
    }

    const menuClick = (e) => {
        e.stopPropagation()
        dispatch('menu')
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</svelte:head>

<div class={itemClass} style={`${style}`} on:click={itemClick}>
    <div class="title">{title}</div>
    <i class="fa fa-ellipsis-v {iconStyle}"  on:click={menuClick}></i>
</div>

<style lang="scss">
  @import "./theme";

  .title{
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .card-item {
    width: 230px;
    height: 50px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
    border-radius: 8px;
    background-color: white;
    padding: 24px 12px 24px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    cursor: pointer;
  }

  .icon{
    font-size: 20px;
    color: #5b5b5b;
    align-self: center;
    padding: 2px 10px 0 10px;
    border-radius: 5px;
    margin-left: 10px;

    &:hover{
      background-color: #ececec;
      cursor: pointer;
    }
  }

</style>