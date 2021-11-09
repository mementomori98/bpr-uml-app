<script lang="ts">
    import Container from "../../ui/Container.svelte";
    import EditAccountForm from "./Forms/EditAccountForm.svelte";
    import Tabs from "../../ui/Tabs.svelte";
    import TabList from "../../ui/TabList.svelte";
    import Tab from "../../ui/Tab.svelte";
    import TabPanel from "../../ui/TabPanel.svelte";
    import InvitationsCard from "./Users/InvitationsCard.svelte";
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
  @import "../../theme.scss";
</style>