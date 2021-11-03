<script lang="ts">
    import Card from "../../ui/Card.svelte";
    import View from "../../ui/View.svelte";
    import Button from "../../ui/Button.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import CloseButton from "../../ui/CloseButton.svelte";
    import {User} from "../../../services/users/User";
    import {Project} from "../../../services/Workspaces/Project";
    import CreateProjectDialog from "./CreateProjectDialog.svelte";

    let createVisible: boolean = false;

    let projects = [
        new Project({name: 'Pegasus'}),
        new Project({name: 'Casino'}),
        new Project({name: 'Spectre'}),
        new Project({name: 'Skyfall'}),
        new Project({name: 'Syndicate'}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

    const leaveProject = (project) => {
        alert("Leaving project " + project.name)
    }
</script>

<Card>
    <View>
        <svelte:fragment slot="header">Projects in workspace</svelte:fragment>
        <svelte:fragment slot="header-actions"></svelte:fragment>
        <ListRow isHeader>
            <ListRowItem widthInPercentage={93}>Name</ListRowItem>
            <ListRowItem widthInPercentage={7}>Leave</ListRowItem>
        </ListRow>
        {#each projects as project}
            <ListRow noFunction>
                <ListRowItem widthInPercentage={93}>{project.name}</ListRowItem>
                <ListRowItem widthInPercentage={7}>
                    <CloseButton on:click={() => leaveProject(project)}/>
                    <!-- TODO disabled if not product owner--></ListRowItem>
            </ListRow>
        {/each}
        <svelte:fragment slot="actions"> <!-- TODO disabled if not product owner-->
            <Button on:click={() => createVisible = true}>Create Project</Button>
        </svelte:fragment>
    </View>
</Card>

<CreateProjectDialog bind:visible={createVisible}/>

<style lang="scss">
  @import "../../theme.scss";

</style>