<script lang="ts">

    import {AuthenticationService} from "../auth/AuthenticationService";
    import {register} from "./Services";
    import {WorkspaceService} from "../workspaces/WorkspaceService";
    import {RestClient} from "./RestClient";
    import {AppContext} from "./AppContext";
    import {ProjectService} from "../projects/ProjectService";
    import {DiagramService} from "../diagrams/DiagramService";
    import {Snackbar} from "./Snackbar";
    import {UserService} from "../users/UserService";

    register(AuthenticationService, () => new AuthenticationService());
    register(WorkspaceService, () => new WorkspaceService());
    register(ProjectService, () => new ProjectService());
    register(DiagramService, () => new DiagramService());
    register(UserService, () => new UserService());
    register(RestClient, () => new RestClient('https://bpr-uml-rest-server.herokuapp.com'))
    register(AppContext, () => AppContext.instance);
    register(Snackbar, () => Snackbar.instance);

</script>
