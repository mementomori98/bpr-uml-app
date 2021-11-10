<script lang="ts">

    import LoginView from "./LoginView.svelte";
    import SignupView from "./SignupView.svelte";
    import {createEventDispatcher} from "svelte";
    import {goto} from "@roxi/routify";
    import {Workspace, WorkspaceInvitation} from "../workspaces/Models";
    import getService from "../utils/ServiceFactory";
    import {UserService} from "../users/UserService";
    import {WorkspaceService} from "../workspaces/WorkspaceService";

    const dispatch = createEventDispatcher();

    let login: boolean = true;
    const userService = getService(UserService);
    const workspaceService = getService(WorkspaceService);

    let workspaces = [];
    let invitations = []

    const onLogin = async () => {
        invitations = await userService.getUserInvitations();
        workspaces = await workspaceService.get();
        if(workspaces.length >= 1 || invitations.length >= 1){
            $goto('/select-workspace')
        }else{
            $goto('/create-workspace')
        }
    }

    const onSignup = () => {
        $goto('/create-workspace')
    }
</script>

{#if login}
    <LoginView on:login={onLogin} on:signup={() => login = false}/>
{:else}
    <SignupView on:login={() => login = true} on:signup={onSignup}/>
{/if}

<style lang="scss">
    @import "../../ui/theme";

</style>