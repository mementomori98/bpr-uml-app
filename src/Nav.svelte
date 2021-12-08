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
    import getService from "./components/utils/ServiceFactory";
    import WorkspaceNavOptions from "./components/workspaces/WorkspaceNavOptions.svelte";
    import {onMount} from "svelte";
    import {WorkspaceService} from "./components/workspaces/WorkspaceService";
    import {AppContext} from "./components/utils/AppContext";
    import MessageIcon from "./ui/MessageIcon.svelte";
    import {AuthenticationService} from "./components/auth/AuthenticationService";
    import {UserService} from "./components/users/UserService";

    const authenticationService = getService(AuthenticationService);
    const workspaceService = getService(WorkspaceService);
    const userService = getService(UserService);
    const appContext = getService(AppContext);

    let visible: boolean;
    let visibleWorkspaces: boolean;
    let workspacesDiv: HTMLElement;
    export let path: string;
    let currentWorkspaceName: string;
    let hasInvitation: boolean = false;

    const handleLogout = function () {
        authenticationService.logout()
        $goto('/login');
    }

    onMount(async () => {
        if(appContext.getAccessToken() == null) {
            $goto('/login');
            return;
        }
        if (appContext.getWorkspaceId() == null) {
            $goto('/create-workspace')
            return;
        }
        try {
            const res = await workspaceService.getById(appContext.getWorkspaceId());
            currentWorkspaceName = res.name;
        } catch (e) {
            authenticationService.logout();
            $goto('/login')
        }
        let invitations = await userService.getUserInvitations();
        if (invitations >= 1) hasInvitation = true;

    })

    const switchWorkspace = async (e) => {
        if (appContext.getWorkspaceId() == null) {
            $goto('/select-workspace')
            return;
        }
        const res = await workspaceService.getById(e.detail.workspaceId);
        appContext.setWorkspaceId(res._id)
        currentWorkspaceName = res.name;
        $goto('/')
    }

</script>

<DrawerLayout>
    <svelte:fragment slot="drawer">
        <NavLink href="/">IndexTest1</NavLink>
        <NavLink href="/zollytest">IndexTest2</NavLink>
        <NavLink href="/projects">Projects</NavLink>
        <NavLink href="/tests">__Tests</NavLink>
        <Spacer size="24"/>
        <NavLink href="/workspaces">Workspace</NavLink>
        <NavLink href="/logout">Log out</NavLink>
        <Spacer size="1"/>
    </svelte:fragment>
    <svelte:fragment slot="appbar">
        <TextButton on:click={$goto('/workspaces')}>{currentWorkspaceName}</TextButton>
        <Spacer/>


        <div style="display: block" bind:this={workspacesDiv}>
            <TextButton on:click={() => visibleWorkspaces = true}>Switch Workspace</TextButton>
            <ContextMenu noPadding bind:visible={visibleWorkspaces}
                         top={workspacesDiv?.offsetTop + workspacesDiv?.offsetHeight} right={60}>
                <WorkspaceNavOptions on:switch={e => switchWorkspace(e)}/>
            </ContextMenu>
        </div>

        <TextButton on:click={() => visible = true}>
            <Icon icon="person"/>
            {#if hasInvitation}
                <div style="position: fixed; right: 24px; top: 28px">
                    <MessageIcon small/>
                </div>
            {/if}
        </TextButton>

        <ContextMenu noPadding bind:visible top="50" right="8">
            <Option on:click={$goto('/account', {tab: "account"})}>Account</Option>
            <Option on:click={$goto('/account', {tab: "invitations"})}>
                <div class="option-wrapper">
                    Invitations
                    {#if hasInvitation}
                        <MessageIcon/>
                    {/if}

                </div>
            </Option>
            <Divider noPadding/>
            <Option on:click={handleLogout}>Log out</Option>
        </ContextMenu>
    </svelte:fragment>
    <slot/>
    {#if path !== '/index' &&
         path !== '/zollytest' &&
         path !== '/projects' &&
         !path.startsWith('/project-open')}
        <VirtualSpace/>
    {/if}
</DrawerLayout>
<!--<Fab on:click={() => alert('fab clicked')}>-->
<!--    <Icon icon="add"/>-->
<!--</Fab>-->

<style lang="scss">
  @import "ui/theme.css";

  .option-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }
</style>


<!--a cigit is eldobáltuk, azon nem panaszkodott senki-->