<script lang="ts">

    import {AuthenticationService} from "../refactor/auth/AuthenticationService";
    import {getContext} from "svelte";
    import getService from "../refactor/utils/Services";

    let authenticationService = getService(AuthenticationService);

    authenticationService.logout();

</script>



<style lang="scss">
    @import "../components/theme.scss";
</style>