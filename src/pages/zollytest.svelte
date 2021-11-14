<script lang="ts">

</script>

<div class="container">
    <div class="cell" id="cell1"></div>
    <div class="cell" id="cell2"></div>
</div>

<style lang="scss">
  @import "../ui/theme";
  div {
    box-sizing: border-box;
    width: 100%;
  }

  .container {
    display: flex;
    border: 1px solid red;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
    height: 100%;
  }

  .cell {
    display: flex;
    flex: 50%;
    padding: 10px;
    border: 1px solid black;
  }

  #cell1{
    background-color: #cbcbcb;
    height: 100%;
  }
  #cell2{
    background-color: #696969;
    height: 100%;
  }

  @media only screen and (max-width: 1000px) {

    .container {
      flex-direction: row;
      flex-wrap: wrap;
      display: flex;
    }

    .cell {
      flex: 100%;
    }

    #cell1{
      height: 25%;
    }
  }

  @media only screen and (min-width: 1000px) {
    .container {
      position: relative;
    }

    #cell1 {
      flex: 0 0 50%;
    }

    #cell2 {
      width: 50%;
    }


  }
</style>