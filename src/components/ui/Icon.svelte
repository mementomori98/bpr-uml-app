<script lang="ts">
    // icons list (check 'google') !!!ONLY HANDLES GOOGLE
    // https://www.w3schools.com/icons/icons_reference.asp

    export let icon: string;
    export const size: number = null;
    export let cursor: string = '';
    export let element: HTMLElement = null;
</script>

<i class="material-icons" bind:this={element} style="cursor: {cursor};">{icon}</i>

<style lang="scss">
    i {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        user-select: none;
    }
</style>