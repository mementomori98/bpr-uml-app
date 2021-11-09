<script lang="ts">

    import { getContext } from 'svelte';
    import Tabs from "./Tabs.svelte";

    const tab = {};
    const { registerTab, selectTab, selectedTab } = getContext(Tabs);

    registerTab(tab);

</script>

<button class:selected="{$selectedTab === tab}" on:click="{() => selectTab(tab)}">
    <slot></slot>
</button>

<style lang="scss">
  @import "../theme.scss";
  button {
    background-color: inherit;
    user-select: none;
    cursor: pointer;
    padding: 8px 16px 8px 0;
    color: #b7b7b7;
    border: none;
    min-width: 60px;
    font: 800 14px "Nunito", sans-serif;
    text-transform: uppercase;
    text-align: left;

    &:hover {
      color: #868686;
    }

    &:active {
     // background-color: rgba(black, 0.05);
      background-color: inherit;
    }
  }

  .selected {
    color: #253a5b;

    &:hover {
      color: #253a5b;
    }
  }
</style>