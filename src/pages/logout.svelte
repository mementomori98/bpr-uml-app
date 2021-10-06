<script lang="ts">

    import {AuthenticationService} from "../services/AuthenticationService";
    import {getContext} from "svelte";
    import getService from "../services/Services";

    let authenticationService = getService(AuthenticationService);

    authenticationService.logout();

</script>



<style lang="scss">
    @import "../components/theme.scss";
</style>