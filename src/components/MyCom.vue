<template>
  <div id="acc">
    <h3>this is a box</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MyCom'
}
</script>

<style scoped>
#acc {
  width: 300px;
  height: 100px;
  border: 1px solid blue;
}
</style>
 