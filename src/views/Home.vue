<template>
  <div class="home">
    <span class="icon icon-A"></span>
    <span class="text">ABSDFBD</span>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  global.ePub = Epub
  export default {
    name: 'home'
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/global";
  .text{
    font-family: 'Days One';
    font-size: px2rem(10);
    color: red;
  }
</style>
