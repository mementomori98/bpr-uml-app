<script lang="ts">
    import DrawerLayout from "./components/ui/DrawerLayout.svelte";
    import NavLink from "./components/ui/NavLink.svelte";
    import Spacer from "./components/ui/Spacer.svelte";
    import TextButton from "./components/ui/TextButton.svelte";
    import Icon from "./components/ui/Icon.svelte";
    import ContextMenu from "./components/ui/ContextMenu.svelte";
    import Option from "./components/ui/Option.svelte";
    import Divider from "./components/ui/Divider.svelte";
    import {goto} from "@roxi/routify";
    import VirtualSpace from "./components/ui/VirtualSpace.svelte";
    import Fab from "./components/ui/Fab.svelte";
    import getService from "./refactor/utils/Services";
    import {AuthenticationService} from "./refactor/auth/AuthenticationService";
    import WorkspaceNavOptions from "./refactor/workspaces/WorkspaceNavOptions.svelte";
    import {onMount} from "svelte";
    import {WorkspaceService} from "./refactor/workspaces/WorkspaceService";
    import {AppContext} from "./refactor/utils/AppContext";
    import {Workspace} from "./refactor/workspaces/Models";
    import MessageIcon from "./components/ui/MessageIcon.svelte";
    import TreeView from "./components/ui/TreeView.svelte";

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

    const demoTree = {
        label: "USA", type:"folder", children: [
            {label: "Cloreida", type:"folder", children: [
                    {label: "Jackdsonville", type:"model"},
                    {label: "Orliando", type:"folder", children: [
                            {label: "Disnney World", type:"model"},
                            {label: "Univversal Studio", type:"model"},
                            {label: "Sea Woporld", type:"folder", children: [
                                    {label: "Cloíyrida", type:"folder", children: [
                                            {label: "Jackbsonville", type:"model"},
                                            {label: "Orlanderdo", type:"folder", children: [
                                                    {label: "Disney vxWorld", type:"model"},
                                                    {label: "Unixvversal Studio", type:"model"},
                                                    {label: "Sea Woerld", type:"folder", children: [
                                                            {label: "Clori3da", type:"folder", children: [
                                                                    {label: "Jackcsonaaville", type:"model"},
                                                                    {label: "Orlangdo", type:"folder", children: [
                                                                            {label: "Disnegy World", type:"model"},
                                                                            {label: "Univers44al Studio", type:"model"},
                                                                            {label: "Sea Wo2rld", type:"model"},
                                                                        ]},
                                                                    {label: "Mfiami"},
                                                                ]}
                                                        ]},
                                                ]},
                                            {label: "Miasami"},
                                        ]}
                                ]},
                        ]},
                    {label: "Miae3mi"},
                ]},
            {label: "Californiua", type:"folder", children: [
                    {label: "Sanfn Francisco", type:"model"},
                    {label: "Los Angz5eles", type:"model"},
                    {label: "Sacramfgento", type:"model"},
                ]},
        ],
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
        
        <NavLink href="/projects">Projects</NavLink>        
        <TreeView tree={demoTree}/>
        <NavLink href="/diagram">__Diagram</NavLink>
        <NavLink href="/tests">__Tests</NavLink>
        <NavLink href="/zollytest">__Tabs</NavLink>
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

        <TextButton on:click={() => visible = true}>
            <Icon icon="person"/>
            <div style="position: fixed; right: 24px; top: 28px"><!-- TODO-->
                <MessageIcon small/>
            </div>
        </TextButton>

        <ContextMenu noPadding bind:visible top="50" right="8">
            <Option on:click={$goto('/account', {tab: "account"})}>Account</Option>
            <Option on:click={$goto('/account', {tab: "invitations"})}>
                <div class="option-wrapper">
                    Invitations
                    <MessageIcon/><!-- TODO-->
                </div>
            </Option>
            <Divider noPadding/>
            <Option on:click={handleLogout}>Log out</Option>
        </ContextMenu>
    </svelte:fragment>
    <slot/>
    {#if path !== '/editor' && path !== '/diagram'}
        <VirtualSpace/>
    {/if}
</DrawerLayout>
<Fab on:click={() => alert('fab clicked')}>
    <Icon icon="add"/>
</Fab>

<style lang="scss">
  @import "components/theme.css";

  .option-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }
</style>
