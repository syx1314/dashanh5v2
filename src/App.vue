<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #efeff4;
  font-size: 14px;
}
.place_holder_box {
  background-color: #efeff4;
  height: 60px;
}
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
</style>
