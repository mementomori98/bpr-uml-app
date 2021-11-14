<script lang="ts">

</script>

<div class="container">
    <div class="cell" id="cell1"></div>
    <div class="cell" id="cell2"></div>
    <div class="cell" id="cell3"></div>
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
    height: 100%;
  }

  .cell {
    display: flex;
    flex: 50%;
    border: 1px solid black;
  }

  #cell1{
    background-color: #4f4f4f;
    height: 25%;
  }
  #cell2{
    background-color: #8c8c8c;
    height: 75%;
  }
  #cell3{
    background-color: #bebebe;
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
    #cell2 {
      display: none;
    }


  }

  @media only screen and (min-width: 1000px) {
    .container {
      position: relative;
    }

    #cell1 {
      flex: 0 0 51%;
    }

    #cell2 {
      flex:  0 0 51%;
    }

    #cell3 {
      flex-direction: column;
      right: 10px;
      position: absolute;
      width: 48%;
    }


  }
</style>