<script lang="ts">
    import View from "../../ui/View.svelte";
    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import {Colors} from "../../ui/utils/Colors";
    import {AuthenticationService} from "./AuthenticationService";
    import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
    import Card from "../../ui/Card.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import firebase from "firebase/compat";
    import getService from "../utils/ServiceFactory";
    import {AppContext} from "../utils/AppContext";
    import {createEventDispatcher} from "svelte";
    import {RestClient} from "../utils/RestClient";

    let username: string;
    let password: string;
    let usernameError: boolean;
    let pwConfirm: string;
    let passwordError: boolean = false;

    const authenticationService: AuthenticationService = getService(AuthenticationService);
    const context = getService(AppContext);
    const dispatch = createEventDispatcher();
    const client = getService(RestClient)

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
            .then(async res => {
                context.setAccessToken(await res.user.getIdToken());
                await client.post('users', {});
                dispatch('signup');
            })
            .catch((err) => {
                console.log(err);
                usernameError = true;
            });
    }

</script>

<Wrapper verticalCentering width="480" bgColor="ededed">
    <Card>
        <View>
            <svelte:fragment slot="header">Sign up</svelte:fragment>
            <Input label="Username" bind:value={username} errorMessage="Username taken" showError={usernameError}/>
            <Input label="Password" bind:value={password} password/>
            <Input label="Repeat password" bind:value={pwConfirm} on:enter={handleCreate} password errorMessage="Passwords don't match" showError={passwordError} />
            <svelte:fragment slot="actions">
                <Button color={Colors.Gray} on:click={() => dispatch('login')}>Login</Button>
                <Button on:click={handleCreate}>Create</Button>
            </svelte:fragment>
        </View>
    </Card>
</Wrapper>


<style lang="scss">
    @import "../../ui/theme";
</style>
