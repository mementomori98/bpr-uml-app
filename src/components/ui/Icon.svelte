

<script lang="ts">
    // icons list (check 'google')
    // https://www.w3schools.com/icons/icons_reference.asp

    export let icon: string;
</script>

<i class="material-icons">{icon}</i>

<style lang="scss">
    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        height: 100%;
        user-select: none;
        font-size: inherit;
    }
</style>