<template>
  <div class='title'>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'CommonTitle',
  props: ['title']
}
</script>

<style lang="less" scoped>
  .title {
    color: white;
    background-color: #317ee7;
    font-size: 16px;
    padding: 15px;
  span {
    display: block;
    width: 100px;
    margin: auto;
  }
  }
</style>
