<template>
  <div>
    <p>
      <label>学号：</label>
      <input type="text" v-model="stu.stuNo"/>
    </p>
    <p>
      <label>姓名：</label>
      <input type="text" v-model="stu.name"/>
    </p>
    <p>
      <label>性别：</label>
      <input type="text" v-model="stu.sex"/>
    </p>
    <p>
      <button type="button" @click="save()">确定</button>
      <button type="button" @click="exit()">取消</button>
    </p>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        stu: {
          id:'',
          stuNo:'',
          name:'',
          sex:''
        }
      }
    },
    methods:{
      save(){
        this.$ajax.post('save',this.stu).then(res=>{
          var result=res.data;
          if(result.success){
            this.$router.go(-1);
          }
        })
      },
      exit(){
        this.$router.go(-1);
      }
    },
    mounted() {
      if(this.params.curr>=0){
        //this.stu=Object.assign({},this.params.stus[this.params.curr]);
        this.stu=deepCopy(this.params.stus[this.params.curr]);
      }
    },
    computed:mapState(['params'])
  }

  function getClass(o) { //判断数据类型
      return Object.prototype.toString.call(o).slice(8, -1);
  }

  function deepCopy(obj) {
      var result, oClass = getClass(obj);

      if (oClass == "Object") result = {}; //判断传入的如果是对象，继续遍历
      else if (oClass == "Array") result = []; //判断传入的如果是数组，继续遍历
      else return obj; //如果是基本数据类型就直接返回

      for (var i in obj) {
          var copy = obj[i];

          if (getClass(copy) == "Object") result[i] = deepCopy(copy); //递归方法 ，如果对象继续变量obj[i],下一级还是对象，就obj[i][i]
          else if (getClass(copy) == "Array") result[i] = deepCopy(copy); //递归方法 ，如果对象继续数组obj[i],下一级还是数组，就obj[i][i]
          else result[i] = copy; //基本数据类型则赋值给属性
      }

      return result;
  }

</script>

<style scoped>
  div {
    width: 31.25rem;
    margin: 3.125rem auto;
  }
  button,input {
    padding: 0.3125rem 0.9375rem;
  }
</style>
