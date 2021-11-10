<script lang="ts">

import Tabs from "../components/ui/Tabs.svelte";
import TabList from "../components/ui/TabList.svelte";
import Tab from "../components/ui/Tab.svelte";
import TabPanel from "../components/ui/TabPanel.svelte";
import WorkspaceForm from "../refactor/workspaces/WorkspaceForm.svelte";
import WorkspaceDangerZone from "../refactor/workspaces/WorkspaceDangerZone.svelte";
import WorkspaceUsersCard from "../refactor/workspaces/WorkspaceUsersCard.svelte";
import MessageIcon from "../components/ui/MessageIcon.svelte";
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
  @import "../components/theme.scss";

</style>