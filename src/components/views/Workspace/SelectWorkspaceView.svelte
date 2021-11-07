<script lang="ts">

    import {createEventDispatcher} from "svelte";
    import View from "../../ui/View.svelte";
    import Card from "../../ui/Card.svelte";
    import Wrapper from "../../ui/Wrapper.svelte";
    import ListRow from "../../ui/ListRow.svelte";
    import ListRowItem from "../../ui/ListRowItem.svelte";
    import {Workspace} from "../../../services/Workspaces/Models";
    import {goto} from "@roxi/routify";
    import Button from "../../ui/Button.svelte";
    import InvitationsList from "./Users/InvitationsList.svelte";
    import Text from "../../ui/Text.svelte";
    import ListScrollWrapper from "../../ui/ListScrollWrapper.svelte";

    const dispatch = createEventDispatcher();

    let workspaces = [
        new Workspace({name: "MOAB", id: 1}),
        new Workspace({name: "FOAB", id: 2}),
        new Workspace({name: "Cobalt", id: 3}),
        new Workspace({name: "Hydrogen", id: 4}),
        new Workspace({name: "Neutron", id: 5}),
    ].sort((u1, u2) => u1.name.localeCompare(u2.name));

</script>

<Wrapper width="480" bgColor="ededed" verticalCentering>
    <Card>
        <View noActions>
            <svelte:fragment slot="header">Select workspace</svelte:fragment>
            <Text noPadding>Your workspaces</Text>
            <ListScrollWrapper fullBorder>
                {#each workspaces as workspace}
                    <ListRow noBorder={workspace === workspaces[workspaces.length-1]} on:click={() => $goto('/')}> <!-- TODO set workspace by the decision -->
                        <ListRowItem widthInPercentage={100}>{workspace.name}</ListRowItem>
                    </ListRow>
                {/each}
            </ListScrollWrapper>

            <InvitationsList/>
        </View>
    </Card>
</Wrapper>

<style lang="scss">
  @import "../../theme.scss";

</style>