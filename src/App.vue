<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['test'])
    },
    mounted () {
      /* this.$store.dispatch('setTest', 15).then(() =>{
        console.log(this.test);
      }) */
    }
  }
  // 设置rem
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > 50 ? 50 : fontSize
    html.style.fontSize = fontSize + 'px'
  })
</script>

<style lang="scss">
  @import "./assets/css/global";
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
