<script lang="ts">
    import {CssBuilder} from "./utils/CssBuilder";
    import {small} from "./MessageIcon.svelte";
    import {createEventDispatcher} from "svelte";
    import {IconType} from "./utils/IconType";

    export let style: string = '';
    export let title: string = '';
    export let icon: IconType = null;
    export let noIcon: boolean = false;
    export let collapsible: boolean = false;
    const dispatch = createEventDispatcher();

    $: itemClass = new CssBuilder('card-item')
        .addFeature('folder', icon === IconType.Folder)
        .addFeature('project', icon === IconType.Project)
        .addFeature('model', icon === IconType.Model)
        .build();

    $: iconStyle = new CssBuilder('icon')
        .addFeature('folder', icon === IconType.Folder)
        .addFeature('project', icon === IconType.Project)
        .addFeature('model', icon === IconType.Model)
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
    <div style="display: flex; width: calc(100% - 32px);">
        {#if icon === IconType.Folder}
            <i class="fa fa-folder {iconStyle}" on:click={menuClick}></i>
        {:else if icon === IconType.Project}
            <i class="fa fa-suitcase {iconStyle}" on:click={menuClick}></i>
        {:else if icon === IconType.Model}
            <i class="fa fa-file {iconStyle}" on:click={menuClick}></i>
        {/if}
        <div class="title">{title}</div>
    </div>
    {#if collapsible}
        <i class="fa fa-ellipsis-v {iconStyle}" style="margin-right: 10px; color: #5b5b5b" on:click={menuClick}></i>
    {/if}

</div>

<style lang="scss">
  @import "./theme";

  .title {
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

    &--folder {
      background-color: #f2f4ff;
    }

    &--model {
      background-color: #fefff3;
    }

    &--project {
      background-color: #f5fff1;
    }
  }

  .icon {
    font-size: 20px;
    align-self: center;

    &--folder {
      margin: 2px 10px 0 0;
      color: #2b4dc9;
    }

    &--model {
      margin: 1px 10px 0 0;
      color: #e7c003;
    }

    &--project {
      margin: -1px 10px 0 0;
      color: #379519;
    }

    &:hover {
      background-color: #ececec;
      cursor: pointer;
    }
  }

</style>