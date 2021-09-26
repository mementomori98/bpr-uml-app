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
    import {Colors} from "../components/ui/Colors";
    import Fab from "../components/ui/Fab.svelte";
    import Icon from "../components/ui/Icon.svelte";
    import ContextMenu from "../components/ui/ContextMenu.svelte";
    import Option from "../components/ui/Option.svelte";
    import VirtualSpace from "../components/ui/VirtualSpace.svelte";
    import TextButton from "../components/ui/TextButton.svelte";
    import Divider from "../components/ui/Divider.svelte";

    const authenticationService = factory.get<AuthenticationService>();
    let loggedIn: boolean;
    let visible: boolean;

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
        '/onboard',
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
                <NavLink href="/">Index</NavLink>
                <NavLink href="/onboard">__Onboard</NavLink>
                <Spacer size="24"/>
                <NavLink href="/settings">Workspace</NavLink>
                <NavLink href="/logout">Log out</NavLink>
                <Spacer size="1"/>
            </svelte:fragment>
            <svelte:fragment slot="appbar">
                <Spacer/>
                <TextButton on:click={() => visible = true}><Icon icon="person"/></TextButton>
                <ContextMenu bind:visible top="50" right="8">
                    <Option on:click={$goto('/account')}>Account</Option>
                    <Divider/>
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