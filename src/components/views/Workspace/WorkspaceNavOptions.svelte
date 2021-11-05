<script lang="ts">

    import {Workspace} from "../../../services/Workspaces/Models";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import {goto} from "@roxi/routify";

    let workspaces = [
        new Workspace({name: "MOAB", _id: 1}),
        new Workspace({name: "FOAB", _id: 2}),
        new Workspace({name: "Cobalt", _id: 3}),
        new Workspace({name: "Hydrogen", _id: 4}),
        new Workspace({name: "Neutron", _id: 5}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

</script>

{#each workspaces as workspace}
    <ListRow noBorder={workspace === workspaces[workspaces.length-1]} on:click={() => $goto('/')}> <!-- TODO set workspace by the decision -->
        <ListRowItem widthInPercentage={100}>{workspace.name}</ListRowItem>
    </ListRow>
{/each}

<style lang="scss">
  @import "../../theme.scss";

</style>