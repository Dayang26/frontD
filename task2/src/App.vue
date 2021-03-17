<template>
  <div id="app">
   <!-- <p>
      <router-link to="/">HelloWorld</router-link>|
      <router-link to="/task">今日任务</router-link>|
      <router-link to="/aaa">子页面</router-link>
    </p>
    <p>
      <button type="button" @click="btn1">HelloWorld</button>
      <button type="button" @click="task">task页面</button>
    </p> -->
    <router-view></router-view>
  </div>
</template>

<script>
import task from '@/components/task.vue'
export default {
  name: 'App',
  components:{
    task
  },
  methods:{
    btn1(){
      this.$router.replace('/');
    },
    task(){
      this.$router.replace('/task');
    }
  }
}
</script>

<style>


</style>
