<script lang="ts">
    import Container from "./Container.svelte";

    export const TABS = {};
    import {setContext, onDestroy, getContext, onMount, createEventDispatcher} from 'svelte';
    import { writable } from 'svelte/store';
    import Tabs from "./Tabs.svelte";
    import Wrapper from "./Wrapper.svelte";
    import {goto} from "@roxi/routify";

    const tabs = [];
    const panels = [];
    const selectedTab = writable(null);
    const selectedPanel = writable(null);
    // export let selected: number = 0;
    const dispatch = createEventDispatcher();

    setContext(Tabs, {
        registerTab: tab => {
            tabs.push(tab);
            selectedTab.update(current => current || tab);

            onDestroy(() => {
                const i = tabs.indexOf(tab);
                tabs.splice(i, 1);
                selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current);
            });
        },

        registerPanel: panel => {
            panels.push(panel);
            selectedPanel.update(current => current || panel);

            onDestroy(() => {
                const i = panels.indexOf(panel);
                panels.splice(i, 1);
                selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
            });
        },

        forceSelectTab: number => {
            const tab = tabs[number];
            const i = tabs.indexOf(tab);
            selectedTab.set(tab);
            selectedPanel.set(panels[i]);
        },

        selectTab: tab => {
            const i = tabs.indexOf(tab);
            selectedTab.set(tab);
            selectedPanel.set(panels[i]);
            $goto('/account');
        },

        selectedTab,
        selectedPanel
    });

    const { forceSelectTab } = getContext(Tabs);

    export function select(selected: number = 0) {
        forceSelectTab(selected)
    }

</script>
<Wrapper bgColor="ffffff">
    <Container>
    <slot></slot>
    </Container>
</Wrapper>
