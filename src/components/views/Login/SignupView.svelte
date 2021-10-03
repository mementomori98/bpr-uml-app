<script lang="ts">
    import View from "../../ui/View.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/Colors";
    import {goto} from "@roxi/routify";
    import {factory} from "../../../services/Factory";
    import {AuthenticationService} from "../../../services/AuthenticationService";
    import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
    import Card from "../../ui/Card.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";

    let username: string;
    let password: string;
    let usernameError: boolean;
    let pwConfirm: string;
    let passwordError: boolean = false;

    const authenticationService = factory.get<AuthenticationService>();

    const handleCreate = () => {
        passwordError = false;
        usernameError = false;
        
        if (password !== pwConfirm)
        {
            passwordError = true;
            return;
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, username, password)
            .then(() => {
                localStorage.setItem('auth', 'true');
                $goto('/');
            })
            .catch(() => {
                usernameError = true;
            });
    }

</script>

<Wrapper verticalCentering width="480" bgColor="ededed">
    <Card>
        <View>
            <svelte:fragment slot="header">Sign up</svelte:fragment>
            <Input label="Username" bind:value={username} errorMsg="Username taken" showError={usernameError}/>
            <Input label="Password" bind:value={password} password/>
            <Input label="Repeat password" bind:value={pwConfirm} on:enter={handleCreate} password errorMsg="Passwords don't match" showError={passwordError} />
            <svelte:fragment slot="actions">
                <Button color={Colors.Gray} on:click={$goto('/login')}>Login</Button>
                <Button on:click={handleCreate}>Create</Button>
            </svelte:fragment>
        </View>
    </Card>
</Wrapper>


<style lang="scss">
    @import "../../theme";
</style>
