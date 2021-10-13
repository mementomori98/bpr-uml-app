<script lang="ts">
    import DrawerLayout from "./ui/DrawerLayout.svelte";
    import NavLink from "./ui/NavLink.svelte";
    import Spacer from "./ui/Spacer.svelte";
    import TextButton from "./ui/TextButton.svelte";
    import Icon from "./ui/Icon.svelte";
    import ContextMenu from "./ui/ContextMenu.svelte";
    import Option from "./ui/Option.svelte";
    import Divider from "./ui/Divider.svelte";
    import {goto} from "@roxi/routify";
    import VirtualSpace from "./ui/VirtualSpace.svelte";
    import Fab from "./ui/Fab.svelte";
    import getService from "../services/Services";
    import {AuthenticationService} from "../services/AuthenticationService";

    const authenticationService = getService(AuthenticationService);
    let visible: boolean;
    export let path: string;

    const handleLogout = function () {
        authenticationService.logout()
        $goto('/login');
    }
</script>

<DrawerLayout>
    <svelte:fragment slot="drawer">
        <NavLink href="/">Index</NavLink>
        <NavLink href="/onboard">__Onboard</NavLink>
        <NavLink href="/create-workspace">__Create Workspace</NavLink>
        <NavLink href="/socket">__Socket</NavLink>
        <Spacer size="24"/>
        <NavLink href="/settings">Workspace</NavLink>
        <NavLink href="/logout">Log out</NavLink>
        <Spacer size="1"/>
    </svelte:fragment>
    <svelte:fragment slot="appbar">
        <Spacer/>
        <TextButton on:click={() => visible = true}><Icon icon="person"/></TextButton>
        <ContextMenu bind:visible top="50" right="8">
            <Option on:click={$goto('/account')}>Account</Option>
            <Divider/>
            <Option on:click={handleLogout}>Log out</Option>
        </ContextMenu>
    </svelte:fragment>
    <slot/>
    {#if path !== '/editor' && path !== '/index'}
        <VirtualSpace/>
    {/if}
</DrawerLayout>
<Fab on:click={() => alert('fab clicked')}>
    <Icon icon="add"/>
</Fab>