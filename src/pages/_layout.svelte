<script lang="ts">
    import Button from "./../components/ui/Button.svelte";
    import DrawerLayout from "./../components/ui/DrawerLayout.svelte";
    import Spacer from "./../components/ui/Spacer.svelte";
    import {AuthenticationService} from "./../services/AuthenticationService";
    import NavLink from "../components/ui/NavLink.svelte";
    import {beforeUrlChange} from "@roxi/routify";
    import {afterPageLoad} from "@roxi/routify";
    import {goto} from "@roxi/routify";
    import {Colors} from "../components/ui/utils/Colors";
    import Fab from "../components/ui/Fab.svelte";
    import Icon from "../components/ui/Icon.svelte";
    import ContextMenu from "../components/ui/ContextMenu.svelte";
    import Option from "../components/ui/Option.svelte";
    import VirtualSpace from "../components/ui/VirtualSpace.svelte";
    import TextButton from "../components/ui/TextButton.svelte";
    import Divider from "../components/ui/Divider.svelte";
    import {getContext} from "svelte";
    import getService from "../services/Services";
    import Nav from "../components/Nav.svelte";
    import SnackbarProvider from "../components/ui/SnackbarProvider.svelte";

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