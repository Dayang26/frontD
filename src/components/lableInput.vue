<template>
  <el-form-item :lable="lable" :prop="prop">
    <el-input v-model="form[prop]" :placeholder="pal" @change="inputChange" clearable></el-input>
    </el-form-item>
</template>

<script>
export default {
  props: {
    lable: {
      type: String,
      // default:'',默认值
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    inputChange(msg) {
      this.$emit(change,msg)
    }
  },
  computed:{
    pal(){
      return '请输入'+this.lable
    }
  }
};
</script>

<style></style>
