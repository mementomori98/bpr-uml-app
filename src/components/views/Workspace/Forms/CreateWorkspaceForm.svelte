<script lang="ts">
    import View from "../../../ui/View.svelte";
    import Input from "../../../ui/Input.svelte";
    import Centerer from "../../../ui/Centerer.svelte";
    import Card from "../../../ui/Card.svelte";
    import Button from "../../../ui/Button.svelte";
    import {Colors} from "../../../ui/Colors";
    import {goto} from "@roxi/routify";
    import {factory} from "../../../../services/Factory";
    import {AuthenticationService} from "../../../../services/AuthenticationService";
    import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

    let workspaceName: string;
    let username: string;
    let password: string;
    let error: string = '';

    const authenticationService = factory.get<AuthenticationService>();

    const handleCreate = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, username, password)
            .then(() => {
                localStorage.setItem('auth', 'true');
                $goto('/');
            })
            .catch(() => {
                error = 'Username taken';
            });
    }

</script>

<Centerer>
    <View>
        <svelte:fragment slot="header">Sign up</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <Input label="Workspace Name" bind:value={workspaceName}/>
        <Input label="Username" bind:value={username}/>
        <Input label="Password" bind:value={password} password/>
        <p>{error}</p>
        <svelte:fragment slot="actions">
            <Button color={Colors.Gray} on:click={$goto('/login')}>Login</Button>
            <Button on:click={handleCreate}>Create</Button>
        </svelte:fragment>
    </View>
</Centerer>


<style lang="scss">
  @import "../../../theme";
</style>