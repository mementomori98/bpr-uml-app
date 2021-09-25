<script lang="ts">

    import {factory} from "../services/Factory";
    import {AuthenticationService} from "../services/AuthenticationService";

    let authenticationService = factory.get<AuthenticationService>()
    authenticationService.logout();

</script>



<style lang="scss">
    @import "../components/theme.scss";
</style>