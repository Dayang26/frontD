<template>
  <div>
    <p>
      <label>账户：</label>
      <el-input  type="text" v-model="user.username" style="width: 10rem;"/>
    </p>
    <p>
      <label>密码：</label>
      <el-input  type="password" v-model="user.password" style="width: 10rem;" />
    </p>
    <p>
    <!--  <button type="button" @click="login()">登录</button> -->
    <el-button type="info"@click="login()">登录</el-button>
    </p>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        user: {
          username:'',
          password:''
        }
      }
    },
    methods:{
      ...mapMutations(['setName','setIsLogined','setUser']),
      login(){
      this.setUser(this.user.username,this.user.password),
        this.$ajax.post('login',this.user).then(res=>{
          var result=res.data;
          if(result.success){
            var name=result.data.name;
            var token=result.data.token;
            window.sessionStorage.setItem("name",name);
            window.sessionStorage.setItem("token",token);
            this.setName(name);
            this.setIsLogined(true);
            this.setUser(this.user.username);
            this.$router.replace('/table1');
          }
        }).catch(error=>{
          alert('账户或密码错误');
        })
      }
    }

  }
</script>

<style scoped>
  div {
    width: 31.25rem;
    margin: 3.125rem auto;
    text-align: center;
  }
  input,button {
    padding: 0.3125rem 0.9375rem;
  }
</style>
