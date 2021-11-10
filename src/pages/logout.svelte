<script lang="ts">

    import {getContext} from "svelte";
    import getService from "../refactor/utils/ServiceFactory";
    import {AuthenticationService} from "../components/auth/AuthenticationService";

    let authenticationService = getService(AuthenticationService);

    authenticationService.logout();

</script>



<style lang="scss">
    @import "../ui/theme";
</style>