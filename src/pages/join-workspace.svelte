<script lang="ts">
    import Card from "../components/ui/Card.svelte";
    import View from "../components/ui/View.svelte";
    import Input from "../components/ui/Input.svelte";
    import Button from "../components/ui/Button.svelte";
    import {Colors} from "../components/ui/Colors";
    import {AuthenticationService} from "../services/AuthenticationService";
    import {goto} from "@roxi/routify";
    import Wrapper from "../components/ui/Wrapper.svelte";
    import getService from "../services/Services";
    import {onMount} from "svelte";
    import LoginOrSignupView from "../components/views/Login/LoginOrSignupView.svelte";
    import JoinWorkspaceForm from "../components/views/Workspace/Forms/JoinWorkspaceForm.svelte";
    import Centerer from "../components/ui/Centerer.svelte";

    let authenticationService = getService(AuthenticationService);

    let loggedIn: boolean;

    onMount(() => {
        authenticationService.logout();
        loggedIn = false;
    });

</script>

{#if loggedIn}
    <Centerer width="480">
        <Card>
            <JoinWorkspaceForm invitationId="hello"/>
        </Card>
    </Centerer>
{:else}
    <LoginOrSignupView on:login={() => loggedIn = true}/>
{/if}

<style lang="scss">

</style>