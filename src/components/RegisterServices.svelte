<script lang="ts">

    import {AuthenticationService} from "../services/AuthenticationService";
    import {register} from "../services/Services";
    import {WorkspaceService} from "../services/Workspaces/WorkspaceService";
    import {RestClient} from "../services/utils/RestClient";
    import {AppContext} from "../services/utils/AppContext";

    register(AuthenticationService, () => new AuthenticationService());
    register(WorkspaceService, () => new WorkspaceService());
    register(RestClient, () => new RestClient('https://bpr-uml-rest-server.herokuapp.com'))
    register(AppContext, () => AppContext.instance);

</script>