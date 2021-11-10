<script lang="ts">
    import Container from "../../components/ui/Container.svelte";
    import EditAccountForm from "./EditAccountForm.svelte";
    import Tabs from "../../components/ui/Tabs.svelte";
    import TabList from "../../components/ui/TabList.svelte";
    import Tab from "../../components/ui/Tab.svelte";
    import TabPanel from "../../components/ui/TabPanel.svelte";
    import InvitationsCard from "./InvitationsCard.svelte";
    import {getContext, onMount, afterUpdate} from "svelte";
    import {goto, params} from "@roxi/routify";


    afterUpdate( () => {
        if($params.tab === "account" ){
            tabs.select(0)
        }else if($params.tab === "invitations" ){
            tabs.select(1)
        }
    })

    const onChange = () => {
        $goto('/account');
    }
    let tabs;

</script>

<Tabs resetUrl="/account" bind:this={tabs}>
    <TabList>
        <Tab>Account</Tab>
        <Tab>Invitations</Tab>
    </TabList>

    <TabPanel>
        <EditAccountForm/>
    </TabPanel>

    <TabPanel>
        <InvitationsCard/>
    </TabPanel>
</Tabs>

<style lang="scss">
  @import "../../components/theme";
</style>