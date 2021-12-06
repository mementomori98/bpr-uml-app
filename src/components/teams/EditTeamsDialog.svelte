<script lang="ts">
    import Form from "../../ui/Form.svelte";
    import Select from "../../ui/Select.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import Dialog from "../../ui/Dialog.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {
        ProjectTeamRequest,
        TeamToProject,
        WorkspaceTeamsResponse,
    } from "../users/Models";
    import {
        AddProjectTeamsRequest,
        ProjectResponse
    } from "../projects/Models";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "../projects/ProjectService";
    import {TeamService} from "./TeamService";
    import {AppContext} from "../utils/AppContext";
    import {createEventDispatcher} from "svelte";
    import {params} from "@roxi/routify";
    import {
        checkIfEmpty,
        filterListById,
        filterListByList,
        formList,
        getItem, getTeamToProject,
        getUserToProject,
        ListItem,
        sortList
    } from "../../ui/utils/ListItem";

    export let visible: boolean = false;

    const teamService = getService(TeamService);
    const appContext = getService(AppContext);
    const projectService = getService(ProjectService);
    let project: ProjectResponse = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});
    let workspaceTeams: WorkspaceTeamsResponse[] = [];
    const dispatch = createEventDispatcher();

    let selectedTeams: TeamToProject[] = []
    let pickList: ListItem[] = [];

    export async function open() {
        project = await projectService.getProject($params.id)
        if (!checkIfEmpty(project.teams)) {
            project.teams.forEach(function (o) {
                Object.defineProperty(o, '_id',
                    Object.getOwnPropertyDescriptor(o, 'teamId'));
                delete o['teamId'];
            });
        }
        const res = await teamService.getWorkspaceTeams(appContext.getWorkspaceId());
        workspaceTeams = sortList(res);
        pickList = formList(workspaceTeams);
        await handleOccurrence();
    }

    const handleOccurrence = async () => {
        pickList = filterListByList(pickList, project.teams)
        if (!checkIfEmpty(project.teams)) {
            project.teams.forEach(team => {
                selectedTeams.push(getTeamToProject(team.team, team.isEditor));
            })
        }
        selectedTeams = sortList(selectedTeams);
    }

    const handleEdit = async () => {
        await projectService.manageProjectTeams(project._id, new AddProjectTeamsRequest({
            teams: selectedTeams.map(team => {
                return new ProjectTeamRequest({teamId: team._id, isEditor: team.isEditor})
            })
        }));
        visible = false;
        resetDialog()
        dispatch('edit')
    }

    const handleCancel = () => {
        visible = false;
        resetDialog()
    }

    const pickTeam = (_id) => {
        let user = getItem(workspaceTeams, _id);
        selectedTeams.push(getTeamToProject(user, true));
        pickList = filterListById(pickList, _id)
        selectedTeams = sortList(selectedTeams);
    }

    const closeTeamChoice = (u) => {
        let team = getItem(workspaceTeams, u._id);
        pickList.push(team);
        selectedTeams = filterListById(selectedTeams, team._id);
        pickList = formList(pickList);
    }

    const resetDialog = () => {
        project = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});
        workspaceTeams = [];
        selectedTeams = []
        pickList = [];
    }

</script>

<Dialog on:clickedOut={resetDialog} bind:visible style="min-width: 600px">
    <Form
            on:submit={handleEdit} cancelButton on:cancel={handleCancel}
            submitText="Edit">
        <svelte:fragment slot="header">Edit teams</svelte:fragment>
        <Select clearOnChoice label="Teams to add" choices={pickList} on:submit={e => pickTeam(e.detail.choice._id)}/>

        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={70}>Name</ListRowItem>
                    <ListRowItem center widthInPercentage={15}>Can edit</ListRowItem>
                    <ListRowItem center widthInPercentage={15}>Kick</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each selectedTeams as team}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={70}>{team.name}</ListRowItem>
                    <ListRowItem center widthInPercentage={15}>
                        <Checkbox bind:checked={team.isEditor}
                                  on:checkChange={e => team.isEditor = e.detail.state }/>
                    </ListRowItem>
                    <ListRowItem center widthInPercentage={15}>
                        <CloseButton on:click={() => closeTeamChoice(team)}/>
                    </ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>
    </Form>
</Dialog>

<style lang="scss">
  @import "../../ui/theme";

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 45px;
  }

  .divider {
    border-bottom: .5px solid rgba(0, 0, 0, .2);
  }


</style>