<template>
  <div style="width:800px">
    <!-- <table>
      <tr class="trHeader">
        <td v-for="(item,index) in col" :key="index" :id="index">{{item.label}}</td>
      </tr>
      <tr v-for="(item,index) in tableData" :key="index">
        <td v-for="(itemTd,indexTd) in dropCol" :key="indexTd">{{item[dropCol[indexTd].prop]}}</td>
      </tr>
    </table>-->
    <!-- <el-table :data="tableData" border row-key="id" align="left">
      <el-table-column
        v-for="(item, index) in col"
        :key="`col_${index}`"
        :prop="dropCol[index].prop"
        :label="item.label"
      ></el-table-column>
    </el-table>-->
    <el-table :data="tableData" border row-key="id" align="left">
      <el-table-column sortable :prop="dropCol[0].prop" :label="col[0].label"></el-table-column>
      <el-table-column sortable="custom" :prop="dropCol[1].prop" :label="col[1].label"></el-table-column>
      <el-table-column :prop="dropCol[2].prop" :label="col[2].label">
        <template slot="header" slot-scope="scope">
          <span style="margin-right:8px;">{{scope.column.label}}</span>
          <el-button type="primary" @click.stop="buttonFu(scope.column.label)">按钮</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pre style="text-align: left">
      {{dropCol}}
    </pre>
    <hr />
    <pre style="text-align: left">
      {{tableData}}
    </pre>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      col: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      dropCol: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '地址',
          prop: 'address'
        }
      ],
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 100 弄'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 200 弄'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 300 弄'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 400 弄'
        }
      ]
    }
  },
  mounted() {
    // 阻止默认行为
    document.body.ondrop = function(event) {
      event.preventDefault()
      event.stopPropagation()
    }
    this.rowDrop()
    this.$nextTick(() => {
      this.columnDrop()
    })
  },
  methods: {
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      console.log(wrapperTr)

      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          // console.log(evt.target.childNodes)
          // var children = evt.target.childNodes
          // for (let i = 0; i < children.length - 1; i++) {
          //   const element = children[i]
          //   element.classList.remove(
          //     'el-table_1_column_1',
          //     'el-table_1_column_2',
          //     'el-table_1_column_3'
          //   )
          //   element.classList.add(`el-table_1_column_${i + 1}`)
          //   console.log(element)
          // }
          const oldItem = this.dropCol[evt.oldIndex]
          this.dropCol.splice(evt.oldIndex, 1)
          this.dropCol.splice(evt.newIndex, 0, oldItem)
        }
      })
    },
    buttonFu(label) {
      console.log(label)
    }
  }
}
</script>
