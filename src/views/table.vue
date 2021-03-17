<template>
  <div style="padding: 1.25rem">
    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="form1" label-width="60px">
        <!-- <el-form-item label="学号" prop="stuNo">
          <el-input v-model="form.stuNo" placeholder="学号" clearable></el-input>
        </el-form-item> -->

        <lable-input lable="学号" :form="form" prop="stuNo" @change="change"></lable-input>
        <el-form-item label="姓名" prop="name"><el-input v-model="form.name" placeholder="姓名" clearable></el-input></el-form-item>
        <el-form-item label="性别" prop="sex"><el-input v-model="form.sex" placeholder="性别" clearable></el-input></el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>

    <p>
      <el-row>
        <el-col :span="20">
          <el-button :size="size" type="info" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button :size="size" type="info" icon="el-icon-edit" @click="edit" :disabled="!currentRow">修改</el-button>
          <el-button :size="size" type="info" icon="el-icon-delete" @click="del" :disabled="!currentRow">删除</el-button>
          <el-button type="warning" :size="size" icon="el-icon-refresh" @click="refreshTable">刷新</el-button>
        </el-col>
        <el-col :span="4"><el-input :size="size" placeholder="请输入查询内容" prefix-icon="el-icon-search" v-model="queryParams.search" clearable @change="searChange" /></el-col>
      </el-row>
    </p>
    <el-table :data="stus" border highlight-current-row @current-change="currentChange" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="stuNo" label="学号"></el-table-column>
      <el-table-column property="name" label="姓名"></el-table-column>
      <el-table-column property="sex" label="性别"></el-table-column>
    </el-table>
    <div style="margin-top: 0.625rem;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.page"
        :page-sizes="[3, 10, 20, 50, 100]"
        :page-size="queryParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import lableInput from '../components/lableInput.vue';
export default {
  components: { lableInput },
  data() {
    return {
      dialogVisible: false,
      title: '对话框',
      size: 'small',
      stus: [],
      total: 0,
      form: {
        stuNo: '',
        name: '',
        sex: '',
      },
      rules: {
        stuNo: [
          {
            required: true,
            message: '学号必填',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '姓名必填',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '性别必填',
            trigger: 'blur'
          }
        ]
      },
      currentRow: null,
      queryParams: {
        limit: 3,
        page: 1,
        sort: 'stuNo',
        order: 'asc',
        search: ''
      }
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
    },
    edit() {
      this.form = Object.assign({}, this.currentRow);
      this.dialogVisible = true;
    },
    del() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.$ajax
            .post('delete', this.currentRow)
            .then(res => {
              var result = res.data;
              if (result.success) {
                this.$notify.success({
                  title: '提示',
                  message: '数据删除成功',
                  position: 'bottom-right'
                });
                this.refreshTable();
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    save() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          this.$ajax.post('save', this.form).then(res => {
            var result = res.data;
            if (result.success) {
              this.form = {};
              this.dialogVisible = false;
              this.$notify({
                title: '提示',
                message: '数据保存成功',
                position: 'bottom-right'
              });
              this.refreshTable();
            }
          });
        }
      });
    },
    currentChange(row) {
      this.currentRow = row;
    },
    refreshTable() {
      this.$ajax
        .post('page', this.queryParams)
        .then(res => {
          var result = res.data;
          if (result.success) {
            // this.stus = result.data;
            this.stus = result.data.rows;
            this.total = result.data.total;
            this.currentRow = null;
          }
        })
        .catch(err => {});
    },
    handleSizeChange(val) {
      this.queryParams.limit = val;
      this.refreshTable();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.refreshTable();
    },
    searChange() {
      this.refreshTable();
    }
  },
  mounted() {
    this.refreshTable();
  }
};
</script>

<style></style>
