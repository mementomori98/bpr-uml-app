<script lang="ts">
    import Button from "./../components/ui/Button.svelte";
    import DrawerLayout from "./../components/ui/DrawerLayout.svelte";
    import Spacer from "./../components/ui/Spacer.svelte";
    import {factory} from "./../services/Factory";
    import {AuthenticationService} from "./../services/AuthenticationService";
    import NavLink from "../components/ui/NavLink.svelte";
    import {beforeUrlChange} from "@roxi/routify";
    import {afterPageLoad} from "@roxi/routify";
    import {goto} from "@roxi/routify";

    const authenticationService = factory.get<AuthenticationService>();
    let loggedIn: boolean;

    let path: string = '';

    $afterPageLoad(p => {
        path = '/' + p.title.replace(' ', '-');
        console.log(path);
        loggedIn = authenticationService.isLoggedIn();
        if (!loggedIn && !noAuth.includes(path)) {
            console.log('redirect to login loggedIn: ' + loggedIn + ' path: ' + path);
            $goto('/login');
        }
    });

    const noAuth: Array<string> = [
        '/login',
        '/create-workspace'
    ];

    const handleLogout = function () {
        authenticationService.logout()
        loggedIn = authenticationService.isLoggedIn();
        $goto('/login');
    }

</script>

<main>
    {#if noAuth.includes(path)}
        <slot/>
    {:else}
        <DrawerLayout>
            <svelte:fragment slot="drawer">
                <NavLink href="/" bind:path>Index</NavLink>
                <NavLink href="/editor" bind:path>Editor</NavLink>
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