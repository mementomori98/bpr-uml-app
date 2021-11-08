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
    import MessageIcon from "./ui/MessageIcon.svelte";
    import TreeView from "./views/TreeView.svelte";

    const authenticationService = getService(AuthenticationService);
    let visible: boolean;
    let visibleWorkspaces: boolean;
    let workspacesDiv: HTMLElement;
    export let path: string;

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
</script>

<DrawerLayout>
    <svelte:fragment slot="drawer">
        <NavLink href="/">Index</NavLink>


        <NavLink href="/projects">Projects</NavLink>
        <TreeView tree={demoTree}/>
        <NavLink href="/tests">__Tests</NavLink>
        <NavLink href="/zollytest">__Tabs</NavLink>
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
            <ContextMenu noPadding bind:visible={visibleWorkspaces}
                         top={workspacesDiv?.offsetTop + workspacesDiv?.offsetHeight} right={60}>
                <WorkspaceNavOptions/>
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
    {#if path !== '/editor' && path !== '/index'}
        <VirtualSpace/>
    {/if}
</DrawerLayout>
<Fab on:click={() => alert('fab clicked')}>
    <Icon icon="add"/>
</Fab>

<style lang="scss">
  @import "theme.css";

  .option-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }
</style>