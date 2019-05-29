<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookMenu from '../../components/ebook/EbookMenu'
  export default {
    name: 'Ebook',
    components: {
      EbookTitle,
      EbookReader,
      EbookMenu
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/global";
  .ebook {
    width: 100%;
    .text{
      font-family: 'Days One';
      font-size: px2rem(10);
      color: red;
    }
  }
</style>
