<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import EditProjectUsersDialog from "../users/EditProjectUsersDialog.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {goto, params} from "@roxi/routify";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {onMount} from "svelte";
    import {ProjectResponse} from "./Models";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "./ProjectService";
    import {sortUserList} from "../../ui/utils/ListItem";

    const projectService = getService(ProjectService);
    let project: ProjectResponse = new ProjectResponse({title: "", users: [], teams: [], _id: "", workspaceId: ""});
    let child;

    onMount(async () => {
        project = await projectService.getProject($params.id)
        project.users = sortUserList(project?.users);
    })

    const onEdit = async () => {
        project = await projectService.getProject($params.id)
        project.users = sortUserList(project?.users);
    }

    let editVisible: boolean = false;

</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users in {project.title}</svelte:fragment>
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={40}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={40}>Email</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Is PM</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Can edit</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each project.users as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={40}>{user.user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={40}>{user.user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox disabled checked={user.isProjectManager}/>
                    </ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox disabled checked={user.isEditor}/>
                    </ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>
        <svelte:fragment slot="actions">
            <Button on:click={() => {editVisible = true;
            child.open()}}>Edit
            </Button>
        </svelte:fragment>
    </View>
</Card>

<EditProjectUsersDialog bind:this={child} bind:visible={editVisible} on:edit={onEdit}/>

<style lang="scss">
  @import "../../ui/theme";

</style>