<script>
    import LoginView from "../components/views/Login/LoginView.svelte";
    import LoginOrSignupView from "../components/views/Login/LoginOrSignupView.svelte";
    import {goto} from "@roxi/routify";
</script>

<LoginOrSignupView on:login={() => $goto('/')}/>