<script lang="ts">

    import {register} from "./ServiceFactory";
    import {WorkspaceService} from "../workspaces/WorkspaceService";
    import {RestClient} from "./RestClient";
    import {AppContext} from "./AppContext";
    import {ProjectService} from "../../components/projects/ProjectService";
    import {DiagramService} from "../diagrams/DiagramService";
    import {Snackbar} from "./Snackbar";
    import {UserService} from "../users/UserService";
    import {AuthenticationService} from "../../components/auth/AuthenticationService";

    register(AuthenticationService, () => new AuthenticationService());
    register(WorkspaceService, () => new WorkspaceService());
    register(ProjectService, () => new ProjectService());
    register(DiagramService, () => new DiagramService());
    register(UserService, () => new UserService());
    register(RestClient, () => new RestClient('https://bpr-uml-rest-server.herokuapp.com'))
    register(AppContext, () => AppContext.instance);
    register(Snackbar, () => Snackbar.instance);

</script>
