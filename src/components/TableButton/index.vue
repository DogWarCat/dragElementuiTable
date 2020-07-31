<template>
  <el-button
      type="primary"
      class="operativeButton"
      :disabled="disabled"
      @click.native.prevent="buttonClick"
      plain
      size="mini">{{buttonName}}
  </el-button>
</template>

<script>
  export default {
    name: 'TableButton',
    props: {
      // 按钮数据
      buttonName: {
        type: String,
        require: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      buttonClick() {
        this.$emit('button-click')
      }
    }
  }
</script>

<style lang="less" scoped>
  .operativeButton {
    font-size: 12px;
    padding: 5px;
    height: 30px;
    margin: 5px 4px;
  }

  .el-button--mini {
    border-radius: 6px;
  }
</style>
