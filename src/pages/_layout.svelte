<script lang="ts">
    import Button from "./../components/ui/Button.svelte";
    import Canvas from "./../components/tests/Canvas.svelte";
    import DrawerLayout from "./../components/ui/DrawerLayout.svelte";
    import Spacer from "./../components/ui/Spacer.svelte";
    import LoginView from "./../components/views/Login/LoginView.svelte";
    import {factory} from "./../services/Factory";
    import {AuthenticationService} from "./../services/AuthenticationService";
    import View from "./../components/ui/View.svelte";
    import Dialog from "./../components/ui/Dialog.svelte";

    const authenticationService = factory.get<AuthenticationService>();
    let loggedIn: boolean = authenticationService.isLoggedIn();

    const handleLogout = function () {
        authenticationService.logout()
        loggedIn = authenticationService.isLoggedIn();
    }
</script>


<main>
    {#if !loggedIn}
        <LoginView bind:loggedIn/>
    {:else}
        <DrawerLayout>
            <svelte:fragment slot="drawer">
                <a href="/#/">Index</a>
                <a href="/#/editor">Editor</a>
            </svelte:fragment>
            <svelte:fragment slot="appbar">
                <Spacer/>
                <Button on:click={handleLogout}>Logout</Button>
            </svelte:fragment>
            <slot/>
        </DrawerLayout>
    {/if}

</main>

<style>
    :global(body) {
        padding: 0;
        font: normal 16px 'Nunito', sans-serif;
        line-height: 1.4;
    }

    main {
        width: 100vw;
        height: 100vh;
    }

    :global(*) {
        box-sizing: border-box;
    }
</style>