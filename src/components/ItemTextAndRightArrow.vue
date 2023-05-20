<template>
  <p  class="item_box">
    {{text}}
    <span class="fr"> <van-image :src="arrowRightBlack" width="15" height="15"/> </span>
  </p>
</template>

<script>
export default {
  name: 'ItemTextAndRightArrow',
  props: ['text'],
  data() {
    return {
      // eslint-disable-next-line global-require
      arrowRightBlack: require('../assets/icon_arrow_right_black.png'),
    }
  }
}
</script>

<style scoped>
 .item_box {
   padding-bottom: 15px;
 }
</style>
