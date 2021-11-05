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
    import {onMount} from "svelte";
    import {WorkspaceService} from "../services/Workspaces/WorkspaceService";
    import {AppContext} from "../services/utils/AppContext";
    import {Workspace} from "../services/Workspaces/Models";

    const authenticationService = getService(AuthenticationService);
    const workspaceService = getService(WorkspaceService);
    const appContext = getService(AppContext);

    let visible: boolean;
    let visibleWorkspaces: boolean;
    let workspacesDiv: HTMLElement;
    export let path: string;
    let currentWorkspaceName: string;

    const handleLogout = function () {
        authenticationService.logout()
        $goto('/login');
    }

    onMount(async () => {
        const res = await workspaceService.getById(appContext.getWorkspaceId());
        currentWorkspaceName = res.name;
    })

    const switchWorkspace = async (e) => {
        const res = await workspaceService.getById(e.detail.workspaceId);
        appContext.setWorkspaceId(res._id)
        currentWorkspaceName = res.name;
    }

</script>

<DrawerLayout>
    <svelte:fragment slot="drawer">
        <NavLink href="/">Index</NavLink>
        <NavLink href="/tests">Tests</NavLink>
        <NavLink href="/join-workspace">__Join Workspace</NavLink>
        <NavLink href="/projects">Projects</NavLink>
        <NavLink href="/socket">__Socket</NavLink>
        <Spacer size="24"/>
        <NavLink href="/settings">Workspace</NavLink>
        <NavLink href="/logout">Log out</NavLink>
        <Spacer size="1"/>
    </svelte:fragment>
    <svelte:fragment slot="appbar">
        <TextButton on:click={() => $goto('/settings')}>{currentWorkspaceName}</TextButton>
        <Spacer/>
        <div style="display: block" bind:this={workspacesDiv}>
            <TextButton on:click={() => visibleWorkspaces = true}>Switch Workspace</TextButton>
            <ContextMenu noPadding bind:visible={visibleWorkspaces} top={workspacesDiv?.offsetTop + workspacesDiv?.offsetHeight} right={60}>
                <WorkspaceNavOptions on:switch={e => switchWorkspace(e)}/>
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
