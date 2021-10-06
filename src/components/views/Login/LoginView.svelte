<script lang="ts">

    import Input from "../../ui/Input.svelte";
    import Button from "../../ui/Button.svelte";
    import View from "../../ui/View.svelte";
    import {goto} from "@roxi/routify";
    import {Colors} from "../../ui/Colors";
    import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
    import Wrapper from "../../ui/Wrapper.svelte";
    import {factory} from "../../../services/Factory";
    import {AuthenticationService} from "../../../services/AuthenticationService";
    import Card from "../../ui/Card.svelte";

    let authenticationService = factory.get<AuthenticationService>();

    let username: string;
    let password: string;
    let error: string = '';

    function handleLogin() {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, username, password)
            .then(cred => {
                localStorage.setItem('auth', 'true');
                $goto('/');
            })
            .catch((err) => {
                console.log(err);
                error = 'Login failed'
            });
    }

    function handleGoogleLogin() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(res => {
                localStorage.setItem('auth', 'true');
                $goto('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }


</script>

<Wrapper width="480" bgColor="ededed" verticalCentering>
    <Card>
        <View>
            <svelte:fragment slot="header">Login</svelte:fragment>
            <Input label="Username" bind:value={username} on:enter={handleLogin} focused/>
            <Input label="Password" bind:value={password} password on:enter={handleLogin}/>
            <svelte:fragment slot="actions">
                <Button color="{Colors.Gray}" on:click={$goto('/signup')}>Sign up</Button>
                <Button on:click={handleGoogleLogin}>Login with Google</Button>
                <Button on:click={handleLogin}>Login</Button>
            </svelte:fragment>
        </View>
    </Card>
</Wrapper>


<style lang="scss">
  @import "../../theme";

</style>
