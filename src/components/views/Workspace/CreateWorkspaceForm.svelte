<script lang="ts">
    import View from "../../ui/View.svelte";
    import Input from "../../ui/Input.svelte";
    import Centerer from "../../ui/Centerer.svelte";
    import Card from "../../ui/Card.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/Colors";
    import {goto} from "@roxi/routify";
    import {factory} from "../../../services/Factory";
    import {AuthenticationService} from "../../../services/AuthenticationService";

    let workspaceName: string;
    let username: string;
    let password: string;

    const authenticationService = factory.get<AuthenticationService>();

    const handleCreate = () => {
        // todo implement
        authenticationService.login('', '');
        $goto('/');
    }

</script>

<Centerer>
    <View>
        <svelte:fragment slot="header">Sign up</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <Input label="Workspace Name" bind:value={workspaceName}/>
        <Input label="Username" bind:value={username}/>
        <Input label="Password" bind:value={password} password/>
        <svelte:fragment slot="actions">
            <Button color={Colors.Gray} on:click={$goto('/login')}>Login</Button>
            <Button on:click={handleCreate}>Create</Button>
        </svelte:fragment>
    </View>
</Centerer>


<style lang="scss">
    @import "../../theme.scss";
</style>