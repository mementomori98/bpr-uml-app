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
    import WorkspaceNavOptions from "./views/Workspace/WorkspaceNavOptions.svelte";

    const authenticationService = getService(AuthenticationService);
    let visible: boolean;
    let visibleWorkspaces: boolean;
    let workspacesDiv: HTMLElement;
    export let path: string;

    const handleLogout = function () {
        authenticationService.logout()
        $goto('/login');
    }
</script>

<DrawerLayout>
    <svelte:fragment slot="drawer">
        <NavLink href="/">Index</NavLink>
        <NavLink href="/tests">Tests</NavLink>
        <NavLink href="/zollytest">Zolly Tabs Test</NavLink>
        <NavLink href="/join-workspace">__Join Workspace</NavLink>
        <NavLink href="/projects">Projects</NavLink>
        <NavLink href="/socket">__Socket</NavLink>
        <Spacer size="24"/>
        <NavLink href="/settings">Workspace</NavLink>
        <NavLink href="/logout">Log out</NavLink>
        <Spacer size="1"/>
    </svelte:fragment>
    <svelte:fragment slot="appbar">
        <Spacer/>
        <div style="display: block" bind:this={workspacesDiv}>
            <TextButton on:click={() => visibleWorkspaces = true}>Switch Workspace</TextButton>
            <ContextMenu noPadding bind:visible={visibleWorkspaces} top={workspacesDiv?.offsetTop + workspacesDiv?.offsetHeight} right={60}>
                <WorkspaceNavOptions/>
            </ContextMenu>
        </div>
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
