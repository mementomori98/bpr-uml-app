<script lang="ts">

    import {AuthenticationService} from "../services/AuthenticationService";
    import {register} from "../services/Services";
    import {WorkspaceService} from "../services/Workspaces/WorkspaceService";

    register(AuthenticationService, () => new AuthenticationService());
    register(WorkspaceService, () => new WorkspaceService());

</script>