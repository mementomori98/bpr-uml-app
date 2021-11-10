<script lang="ts">

    import LoginView from "./LoginView.svelte";
    import SignupView from "./SignupView.svelte";
    import {createEventDispatcher} from "svelte";
    import {goto} from "@roxi/routify";
    import {Workspace} from "../workspaces/Models";


    const dispatch = createEventDispatcher();

    let login: boolean = true;

    let workspaces = [
        new Workspace({name: "MOAB", id: 1}),
        new Workspace({name: "FOAB", id: 2}),
        new Workspace({name: "Cobalt", id: 3}),
        new Workspace({name: "Hydrogen", id: 4}),
        new Workspace({name: "Neutron", id: 5}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    const onLogin = () => {
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
    @import "../../components/theme";

</style>