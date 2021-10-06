<script lang="ts">

    import {AuthenticationService} from "../services/AuthenticationService";
    import {register} from "../services/Services";

    register(AuthenticationService, () => new AuthenticationService());

</script>