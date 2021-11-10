<script lang="ts">

import Tabs from "../ui/Tabs.svelte";
import TabList from "../ui/TabList.svelte";
import Tab from "../ui/Tab.svelte";
import TabPanel from "../ui/TabPanel.svelte";
import WorkspaceForm from "../components/workspaces/WorkspaceForm.svelte";
import WorkspaceDangerZone from "../components/workspaces/WorkspaceDangerZone.svelte";
import WorkspaceUsersCard from "../components/workspaces/WorkspaceUsersCard.svelte";
import MessageIcon from "../ui/MessageIcon.svelte";
</script>


<Tabs>
    <TabList>
        <Tab>Workspace</Tab>
        <Tab>Danger</Tab>
        <Tab>Users</Tab>
    </TabList>

    <TabPanel>
        <WorkspaceForm/>
    </TabPanel>

    <TabPanel>
        <WorkspaceDangerZone/>
    </TabPanel>

    <TabPanel>
        <WorkspaceUsersCard/>
    </TabPanel>
</Tabs>

<style lang="scss">
  @import "../ui/theme";

</style>