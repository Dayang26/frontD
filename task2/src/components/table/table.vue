<template>
  <div>
    <p>
      <button @click="add()">新增</button>
      <button @click="edit()" :disabled="curr===-1">修改</button>
      <button @click="del()" :disabled="curr===-1">删除</button>
    </p>
    <table border="1">
      <tr>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
      </tr>
      <tr v-for="(stu,idx) in stus" :key="idx" @click="currRow(idx)" :class="curr==idx?'active':''">
        <td>{{stu.stuNo}}</td>
        <td>{{stu.name}}</td>
        <td>{{stu.sex}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex';
  export default {
    data() {
      return {
        stus: [/* {
          stuNo:'0101',
          name:'张三',
          sex:'男'
        },{
          stuNo:'0102',
          name:'李四',
          sex:'男'
        },{
          stuNo:'0103',
          name:'王五',
          sex:'女'
        },{
          stuNo:'0104',
          name:'赵六',
          sex:'男'
        },{
          stuNo:'0105',
          name:'马七',
          sex:'女'
        } */],
        curr: -1
      }
    },
    methods:{
      ...mapMutations(['setParams']),
      add(){
        var params={stus:this.stus,curr:-1};
        this.setParams(params);
        this.$router.push('/edit');
      },
      edit(){
        var params={stus:this.stus,curr:this.curr};
        this.setParams(params);
        this.$router.push('/edit');

      },
      del(){
        this.$ajax.post('delete',this.stus[this.curr]).then(res=>{
          this.stus.splice(this.curr,1);
          this.curr=-1;
        }).catch(error=>{
          alert('网络连接失败...');
        })
      },
      currRow(idx){
        if(idx===this.curr){
          this.curr=-1
        }else{
          this.curr=idx;
        }
      }
    },
    computed:{
      ...mapState(['params'])
    },
    mounted() {
      this.$ajax.post('list',{}).then(res=>{
        var result=res.data;
        if(result.success){
          this.stus=result.data;
        }
      })
      if(this.params){
        //this.stus=this.params.stus;
        this.curr=this.params.curr;
      }
    }
  }
</script>

<style scoped>

  div {
    width: 31.25rem;
    margin: 3.125rem auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;

  }
  td,th,button {
    padding: 0.3125rem 0.9375rem;
    text-align: center;
  }
  .active {
    background-color: aquamarine;
  }

</style>
