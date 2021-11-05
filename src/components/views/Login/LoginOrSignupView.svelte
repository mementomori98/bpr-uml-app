<script lang="ts">

    import LoginView from "./LoginView.svelte";
    import SignupView from "./SignupView.svelte";
    import {createEventDispatcher, onMount} from "svelte";
    import {goto} from "@roxi/routify";
    import {Workspace} from "../../../services/Workspaces/Models";
    import getService from "../../../services/Services";
    import {WorkspaceService} from "../../../services/Workspaces/WorkspaceService";


    const dispatch = createEventDispatcher();
    let login: boolean = true;
    const workspaceService = getService(WorkspaceService);
    let workspaces = [];

    const onLogin = async () => {

        workspaces = await workspaceService.get();

        if(workspaces.length >= 1){
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
    @import "../../theme.scss";

</style>