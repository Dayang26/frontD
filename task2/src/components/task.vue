<template>
  <div id="app">
    <h3>欢迎你：{{user}}</h3>
    <p v-for="item,idx in arr" :key="idx" class="task">
      <span v-text="item"></span>
      <button type="button" @click="prev(idx)" :disabled="idx===0">上移</button>
      <button type="button" @click="next(idx)" :disabled="idx===len-1">下移</button>
      <button type="button" @click="del(idx)">删除</button>
      <button type="button" @click="over(idx)">完成</button>
    </p>
    <p>
      <input type="text" v-model="txt"/>
      <button type="button" @click="add()" :disabled="!txt">新增</button>
    </p>
    <br/>
    <hr />
    <h3>已完成的任务</h3>
    <p v-for="item in overs" v-text="item"></p>
    <router-view></router-view>
  </div>

</template>

<script>
  import {mapState} from 'vuex';
export default {
  name: 'task',
  props:{
    title:{
      type:String,
      //required:true,
      default:'今天的任务'
    }
  },
  data() {
    return {
      arr:[],
      overs:[],
      txt:''
    }
  },
  methods:{
    add(){
      this.arr.push(this.txt);
      this.txt='';
    },
    prev(idx){

    },
    next(idx){

    },
    del(idx){

    },
    over(idx){

    }
  },
  computed:{
    ...mapState(['user']),
    len(){
      return this.arr.length;
    }
  }
}
</script>

<style scoped="scoped">
  .task span {
    display: inline-block;
    width: 18.75rem;
    color: red;
  }
  button,input{
    padding: 0.3125rem 0.9375rem;
  }
</style>
