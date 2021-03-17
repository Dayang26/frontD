<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>

    <el-container>
      <el-header height="120px">Header</el-header>

      <el-main>
        Main
        <div>
          <p>
            <el-button @click="add()" type="primary" icon="el-icon-plus"></el-button>
            <el-button @click="edit()" type="primary" icon="el-icon-edit" :disabled="curr === -1"></el-button>
            <el-button @click="del()" type="primary" icon="el-icon-delete" :disabled="curr === -1"></el-button>
            <el-button @click="logout2()" type="primary" icon="el-icon-circle-close"></el-button>
          </p>
          <table border="1">
            <tr>
              <th>学号</th>
              <th>姓名</th>
              <th>性别</th>
            </tr>
            <tr v-for="(stu, idx) in stus" :key="idx" @click="currRow(idx)" :class="curr == idx ? 'active' : ''">
              <td>{{ stu.stuNo }}</td>
              <td>{{ stu.name }}</td>
              <td>{{ stu.sex }}</td>
            </tr>
          </table>


          <el-table :data="stus" border style="width: 15.625rem
          
          
          
          %" >
            <el-table-column prop="stuNo" label="学号" width="180" style="text-align: center;"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
          </el-table>



        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      stus: [
        /* {
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
        } */
      ],
      curr: -1
    };
  },
  methods: {
    ...mapMutations(['setParams', 'logout']),
    add() {
      var params = { stus: this.stus, curr: -1 };
      this.setParams(params);
      this.$router.push('/edit');
    },
    edit() {
      var params = { stus: this.stus, curr: this.curr };
      this.setParams(params);
      this.$router.push('/edit');
    },
    del() {
      this.$ajax
        .post('delete', this.stus[this.curr])
        .then(res => {
          this.stus.splice(this.curr, 1);
          this.curr = -1;
        })
        .catch(error => {
          alert('网络连接失败...');
        });
    },
    currRow(idx) {
      if (idx === this.curr) {
        this.curr = -1;
      } else {
        this.curr = idx;
      }
    },
    logout2() {
      this.logout();
      this.$router.replace('/');
    }
  },
  computed: {
    ...mapState(['params'])
  },
  mounted() {
    this.$ajax.post('list', {}).then(res => {
      var result = res.data;
      if (result.success) {
        this.stus = result.data;
      }
    });
    if (this.params) {
      //this.stus=this.params.stus;
      this.curr = this.params.curr;
    }
  }
};
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
td,
th,
button {
  padding: 0.3125rem 0.9375rem;
  text-align: center;
}
.active {
  background-color: aquamarine;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  width: auto;
  height: 500px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
