<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import UserSettingsDialog from "../users/UserSettingsDialog.svelte";
    import EditProjectUsersDialog from "../users/EditProjectUsersDialog.svelte";
    import Checkbox from "../../ui/Checkbox.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import {goto, params} from "@roxi/routify";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";
    import {User} from "../users/Models";
    import {onMount} from "svelte";
    import {ProjectResponse} from "./Models";
    import getService from "../utils/ServiceFactory";
    import {ProjectService} from "./ProjectService";

    const projectService = getService(ProjectService);
    let project: ProjectResponse = new ProjectResponse({title: "", users: []});

    onMount(async () => {
        project = await projectService.getProject($params.id)
    })

    let editVisible: boolean = false;

</script>

<Card>
    <View>
        <svelte:fragment slot="header">Users in {project.title}</svelte:fragment>
        <!-- TODO disabled if not product owner-->
        <ListScrollWrapper>
            <svelte:fragment slot="header">
                <ListRow isHeader>
                    <ListRowItem widthInPercentage={45}>Name</ListRowItem>
                    <ListRowItem widthInPercentage={45}>Email</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>Can edit</ListRowItem>
                </ListRow>
            </svelte:fragment>
            {#each project.users as user}
                <ListRow noFunction>
                    <ListRowItem widthInPercentage={45}>{user.name}</ListRowItem>
                    <ListRowItem widthInPercentage={45}>{user.email}</ListRowItem>
                    <ListRowItem center widthInPercentage={10}>
                        <Checkbox disabled bind:checked={user.isEditor}/>
                    </ListRowItem>
                </ListRow>
            {/each}
        </ListScrollWrapper>

        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => editVisible = true}>Edit</Button>
        </svelte:fragment>
    </View>
</Card>

<EditProjectUsersDialog bind:visible={editVisible}/>

<style lang="scss">
  @import "../../ui/theme";

</style>