<script lang="ts">

    import {AuthenticationService} from "../services/AuthenticationService";
    import {register} from "../services/Services";
    import {WorkspaceService} from "../services/Workspaces/WorkspaceService";
    import {RestClient} from "../services/utils/RestClient";
    import {AppContext} from "../services/utils/AppContext";
    import {ProjectService} from "../services/projects/ProjectService";
    import {DiagramService} from "../services/diagrams/DiagramService";
    import {UserService} from "../services/users/UserService";

    register(AuthenticationService, () => new AuthenticationService());
    register(WorkspaceService, () => new WorkspaceService());
    register(ProjectService, () => new ProjectService());
    register(DiagramService, () => new DiagramService());
    register(UserService, () => new UserService());
    register(RestClient, () => new RestClient('https://bpr-uml-rest-server.herokuapp.com'))
    register(AppContext, () => AppContext.instance);

</script>