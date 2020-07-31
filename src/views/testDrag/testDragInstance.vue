<template>
  <div class="testDrag">
    <dynamic-table
      :tableData="tableData"
      :fixButtonArr="fixButtonArr"
      :dialogShow.sync="headerDialogVisible"
      @click="tableConfirm"
      @sort-change="sort"
      @header-dragend="headerDrag"
      :checkColInit="checkCol"
      :dropColInit="dropColInit"
      :cantDragColumn="2"
      :minwidth="'250px'"
      @select="selectL"
    >
      <template #headerInsert_poetry="scope">
        {{scope.scope.$index}}
        <el-button type="primary" @click.stop="header(scope)">表头插槽使用</el-button>
      </template>
      <template #lineInsert_name="scope">
        {{scope.scope.row.name}}
        <el-button type="primary">行插槽使用</el-button>
      </template>
      <template #operateInsert="scope">
        {{scope.scope.row.name}}
        <el-button type="primary">操作列插槽使用</el-button>
      </template>
    </dynamic-table>
    <el-button type="text" @click="headerDialogVisible.flag = true">点击打开 Dialog</el-button>
  </div>
</template>

<script>
import DynamicTable from '@/components/DynamicTable_f'
export default {
  components: { DynamicTable },
  data() {
    return {
      // 表头设置弹框
      // (用对象而不直接用boolean值是因为对话框封装成子组件的时候，点击头部小叉叉总是会报不能操作子组件属性值的错误，实属无奈之举，勿动)
      headerDialogVisible: { flag: false },
      // 表格表头属性--------往后台传从后台取
      checkCol: [
        {
          label: 'check',
          prop: null,
          width: null, //列宽
          sort: null, //排序方式
          sortable: null, //是否显示排序图标
          insertFlagArr: { alertbutton: null }, //表头自定义组件
          collapse: null, //展开收起
          selection: 'selection'
        },
        {
          label: '序号',
          prop: 'id',
          width: 100, //列宽
          sort: 'descending', //排序方式
          sortable: false, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false //展开收起
        },
        {
          label: '日期',
          prop: 'date',
          width: 100, //列宽
          sort: 'descending', //排序方式
          sortable: true, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false //展开收起,
        },
        {
          label: '姓名',
          prop: 'name',
          width: 120,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '地址',
          prop: 'address',
          width: 300,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: true },
          collapse: false
        },
        {
          label: '作者',
          prop: 'author',
          width: 100,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '诗歌',
          prop: 'poetry',
          width: 300,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        }
      ],
      // 表格表头拖拽显隐后的属性--------往后台传从后台取
      dropColInit: [
        {
          label: 'check', //必填
          prop: null,
          width: null,
          sort: null,
          sortable: null,
          insertFlagArr: { alertbutton: null },
          collapse: null,
          selection: 'selection'
        },
        {
          label: '序号',
          prop: 'id',
          width: 100, //列宽
          sort: 'descending', //排序方式(鸡肋，因为记录了也不能在一开始初始化的时候多个列都排序，因为一次只能按照一列的规则来排序)
          sortable: false, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false //展开收起
        },
        {
          label: '日期',
          prop: 'date',
          width: 100, //列宽
          sort: 'descending', //排序方式
          sortable: true, //是否显示排序图标
          insertFlagArr: { alertbutton: false }, //表头自定义组件
          collapse: false
        },
        {
          label: '姓名',
          prop: 'name',
          width: 120,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '地址',
          prop: 'address',
          width: 300,
          sort: '',
          sortable: false,
          insertFlagArr: { alertbutton: true },
          collapse: false
        },
        {
          label: '作者',
          prop: 'author',
          width: 100,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        },
        {
          label: '诗歌',
          prop: 'poetry',
          width: 300,
          sort: '',
          sortable: true,
          insertFlagArr: { alertbutton: false },
          collapse: false
        }
      ],
      fixButtonArr: ['确认', '调整'], //固定列的按钮
      // 表格数据
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 100 弄',
          author: '杜甫',
          poetry: '江边踏青罢，回首见旌旗。风起春城暮，高楼鼓角悲。'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 200 弄',
          author: '苏轼',
          poetry:
            '莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 300 弄',
          author: '李白',
          poetry:
            '李白乘舟将欲行，忽闻岸上踏歌声。桃花潭水深千尺，不及汪伦送我情'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 400 弄',
          author: '李清照',
          poetry:
            '常记溪亭日暮，沉醉不知归路，兴尽晚回舟，误入藕花深处。争渡，争渡，惊起一滩鸥鹭。'
        }
      ]
    }
  },
  methods: {
    header(scope) {
      console.log(scope)
    },
    selectL(selection, row) {
      console.log(selection)
      console.log(row)
    },
    // 表格操作按钮,函数名为click-0、click-1依次类推
    // id-点击对应的行序号
    tableConfirm(row, type) {
      console.log(row)
      console.log(type)
    },
    // 表格排序按钮点击函数
    // { column, prop, order }-同elementui
    // dropCol-表头数组
    sort({ column, prop, order }, dropCol) {
      console.log(column)
      console.log(prop)
      console.log(order)
      console.log(dropCol)
    },
    // 列宽拖动函数
    // newWidth, oldWidth, column, event-同elementui
    // dropCol-表头数组
    headerDrag(newWidth, oldWidth, column, event, dropCol) {
      console.log(newWidth)
      console.log(oldWidth)
      console.log(column)
      console.log(event)
      console.log(dropCol)
    }
  }
}
</script>

<style>
</style>