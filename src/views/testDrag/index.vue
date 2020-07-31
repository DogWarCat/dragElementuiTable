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
    <!-- <el-table
      :data="tableData"
      border
      row-key="id"
      align="left"
      @header-dragend="widthRecode"
      @sort-change="sortChange"
    >
      <el-table-column sortable :prop="dropCol[0].prop" :label="col[0].label"></el-table-column>
      <el-table-column :prop="dropCol[1].prop" :label="col[1].label"></el-table-column>
      <el-table-column :prop="dropCol[2].prop" :label="col[2].label">
        <template slot="header" slot-scope="scope">
          <span style="margin-right:8px;">{{scope.column.label}}</span>
          <el-button type="primary" @click.stop="buttonFu(scope.column.label)">按钮</el-button>
        </template>
      </el-table-column>
    </el-table>-->

    <el-table
      :data="tableData"
      border
      row-key="id"
      align="left"
      @header-dragend="widthRecode"
      @sort-change="sortChange"
    >
      <el-table-column
        sortable="custom"
        v-for="(item, index) in dropCol"
        :key="`col_${index}`"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot="header" slot-scope="scope">
          <span style="margin-right:8px;">{{scope.column.label}}</span>
          <el-button
            v-if="item.insertFlagArr.alertbutton"
            @click.stop="buttonFu(scope.column.label)"
            type="primary"
          >按钮</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span v-html="dropCol[2].htmlText"></span>
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
// import tableDrag from '@/utils/tableDrag'
// import $ from 'jquery' //在需要使用的页面中
export default {
  data() {
    return {
      dropCol: [
        {
          label: '日期',
          prop: 'date',
          width: 100,
          sort: 'descending',
          display: true,
          insertFlagArr: { alertbutton: false }
        },
        {
          label: '姓名',
          prop: 'name',
          width: 100,
          sort: '',
          display: true,
          insertFlagArr: { alertbutton: false }
        },
        {
          label: '地址',
          prop: 'address',
          width: 300,
          sort: '',
          display: true,
          insertFlagArr: { alertbutton: true }
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
    // 这句一定要加，因为不加dom没渲染出来，会导致获取不到dom元素
    this.$nextTick(() => {
      this.addThListener()
    })
  },
  methods: {
    addThListener() {
      let thArr = document.querySelectorAll('.el-table__header-wrapper th')
      for (let i = 0; i < thArr.length - 1; i++) {
        let element = thArr[i].childNodes[0]
        if (element.addEventListener) {
          //所有主流浏览器，除了 IE 8 及更早 IE版本
          element.addEventListener('dragover', this.allowDrop)
          element.addEventListener('drop', this.drop)
          element.addEventListener('dragstart', this.drag)
        } else if (element.attachEvent) {
          // IE 8 及更早 IE 版本
          element.attachEvent('dragover', this.allowDrop)
          element.attachEvent('drop', this.drop)
          element.attachEvent('dragstart', this.drag)
        }
        element.setAttribute('draggable', true)
        // element.parentNode.setAttribute('id', i)
        element.setAttribute('id', i)
      }
    },
    drag(ev) {
      // ev.dataTransfer.setData('Text', ev.target.parentNode.id)
      ev.dataTransfer.setData('Text', ev.target.id)
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      // 阻止默认行为
      ev.preventDefault()
      // let oldIndex = ev.target.parentNode.id
      let oldIndex = ev.target.id
      let newIndex = ev.dataTransfer.getData('Text')
      // 切换表头内容
      // this.swap(oldIndex, newIndex)

      // 切换表头对应数据
      this.dropCol.splice(
        oldIndex,
        1,
        ...this.dropCol.splice(newIndex, 1, this.dropCol[oldIndex])
      )
      // console.log(this.dropCol)
    },
    // swap(oldIndex, newIndex) {
    //   var oldChildClone = $(`#${oldIndex}`).find('div')
    //   // var newChildClone = $(`#${newIndex}`)
    //   //   .find('div')
    //   //   .clone(true)
    //   // console.log($(`#${oldIndex}`).text())
    //   // console.log($(`#${newIndex}`).text())

    //   $(`#${oldIndex}`)
    //     .empty()
    //     .prepend($(`#${newIndex}`).find('div'))
    //   $(`#${newIndex}`)
    //     .empty()
    //     .prepend(oldChildClone)
    // },
    // 列宽记录
    widthRecode(newWidth, oldWidth, column, event) {
      console.log(newWidth)
      console.log(oldWidth)
      console.log(column)
      console.log(event)
      this.dropCol.forEach(item => {
        if (item.prop === column.property) {
          item.width = newWidth
        }
      })
      console.log(this.dropCol)
    },
    buttonFu(label) {
      alert(label)
    },
    // 排序函数
    sortChange({ column, prop, order }) {
      console.log(column)
      console.log(prop)
      console.log(order)
      this.dropCol.forEach(item => {
        if (item.prop === prop) {
          item.sort = order
        }
      })
      console.log(this.dropCol)
    }
  }
}
</script>
