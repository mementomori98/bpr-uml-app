<script lang="ts">
    import {beforeUrlChange} from "@roxi/routify";
    import {afterPageLoad} from "@roxi/routify";
    import {goto} from "@roxi/routify";
    import getService from "../components/utils/ServiceFactory";
    import Nav from "../Nav.svelte";
    import SnackbarProvider from "../ui/SnackbarProvider.svelte";
    import {AuthenticationService} from "../components/auth/AuthenticationService";
    import RedirectProvider from "../components/utils/RedirectProvider.svelte";

    const authenticationService = getService(AuthenticationService);
    let loggedIn: boolean;

    let path: string = '';

    $afterPageLoad(p => {
        path = '/' + p.title.replace(' ', '-');
        loggedIn = authenticationService.isLoggedIn();
        if (!loggedIn && !noAuth.includes(path)) {
            $goto('/login');
        }
    });

    const noAuth: Array<string> = [
        '/login',
        '/create-workspace',
        '/select-workspace',
        '/join-workspace',
        '/signup',
    ];



</script>

<RedirectProvider/>

<main>
    <SnackbarProvider/>
    {#if noAuth.includes(path)}
        <slot/>
    {:else}
        <Nav path={path}>
            <slot/>
        </Nav>
    {/if}
</main>

<style>
    :global(body) {
        padding: 0;
        font: normal 16px 'Nunito', sans-serif;
        line-height: 1.4;
        width: 100%;
    }

    :global(*) {
        box-sizing: border-box;
    }

    main {
        height: 100%;
    }
</style>