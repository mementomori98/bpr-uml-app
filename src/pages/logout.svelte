<script lang="ts">
    import getService from "../components/utils/ServiceFactory";
    import {AuthenticationService} from "../components/auth/AuthenticationService";

    let authenticationService = getService(AuthenticationService);

    authenticationService.logout();

</script>



<style lang="scss">
    @import "../ui/theme";
</style>