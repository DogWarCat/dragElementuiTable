<template>
  <div>
    <el-table
      stripe
      :data="tableData"
      border
      align="center"
      :header-cell-style="{background: '#F2F2F2', color: '#555'}"
      @header-dragend="widthRecode"
      @sort-change="sortChange"
      @select="(selection, row)=>{this.$emit('select',selection, row)}"
      @select-all="(selection)=>{this.$emit('select-all',selection)}"
      @selection-change="(selection)=>{this.$emit('selection-change',selection)}"
      :height="tableHeight"
      ref="goodsDetailTable"
      row-key="id"
      class="goodsDetailTable"
    >
      <template v-for="(item, index) in dropCol">
        <el-table-column
          :type="item.selection"
          width="55"
          v-if="item.selection==='selection'"
          :key="index"
        ></el-table-column>
        <el-table-column
          v-else
          :sortable="item.sortable"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.collapse"
        >
          <template slot-scope="scope">
            <slot :name="`lineInsert_${item.prop}`" :scope="scope">{{ scope.row[item.prop] }}</slot>
          </template>
          <template slot="header" slot-scope="scope">
            <span style="margin-right: 8px">{{scope.column.label}}</span>
            <slot :name="`headerInsert_${item.prop}`" :scope="scope">
              <el-button
                :key="`button_${index}`"
                v-if="dropCol[scope.$index].insertFlagArr.alertbutton"
                @click.stop="buttonFu"
                size="mini"
                type="primary"
              >{{dropCol[scope.$index].collapse ? '展开' : '收起'}}</el-button>
            </slot>
            <!-- @click.stop="buttonFu(scope.column.property)" -->
          </template>
        </el-table-column>
      </template>
      <el-table-column fixed="right" label="操作" :min-width="minwidth">
        <template slot-scope="scope">
          <slot :name="`operateInsert`" :scope="scope">
            <table-button
              v-for="(item,index) in fixButtonArr"
              :key="`operate_${index}`"
              :buttonName="item"
              @button-click="tableButton(index, scope.row,item)"
            ></table-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 设置弹出框 -->
    <el-dialog title="自定义列表项" :visible.sync="dialogShow.flag" width="50%">
      <el-checkbox-group v-model="checkedHeaders">
        <template v-for="(header, index) in checkCol">
          <el-checkbox
            v-if="index>cantDragColumn-1"
            :label="header.label"
            :key="header.prop"
            style="width: 20%; margin-bottom: 20px"
          >{{header.label}}</el-checkbox>
        </template>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" style="margin-right: 10px">取 消</el-button>
        <el-button type="primary" @click="confirmCheck">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import TableButton from '@/components/TableButton'

export default {
  name: 'DragTable',
  components: {
    TableButton
  },
  props: {
    // 表头完整属性（主要用于控制显隐的）
    checkColInit: {
      type: Array,
      require: true
    },
    // 表头拖拽隐藏初始数据（表头操作初始数据）
    dropColInit: {
      type: Array,
      require: true
    },
    // 表格数据
    tableData: {
      type: Array,
      require: true
    },
    // 操作按钮数据
    fixButtonArr: {
      type: Array,
      require: true
    },
    // 折叠表单控制表格高度属性
    searchHeight: {
      type: Number,
      default: 0
    },
    // 表头设置控制对话框
    dialogShow: {
      type: Object,
      default: function() {
        return { flag: false }
      }
    },
    // 控制不能拖拽的列,只能从前往后数
    cantDragColumn: {
      type: Number,
      default: 1
    },
    // 操作列宽度
    minwidth: {
      type: String,
      default: '120px'
    }
  },
  data() {
    return {
      checkedHeaders: [],
      dropCol: this.dropColInit,
      checkCol: this.checkColInit
    }
  },
  computed: {
    tableHeight() {
      return (
        'calc(100vh - ' +
        ((this.$store.getters.menuStyle === 1 ? 250 : 291) +
          this.searchHeight) +
        'px)'
      )
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.goodsDetailTable.doLayout()
      this.changeCursor()
      this.addThListener()
    })
    this.initCheckedHeaders()
  },
  destroyed() {
    this.reThListener()
  },
  methods: {
    // 鼠标样式,拖拽时move,改变列宽时col-resize
    changeCursor() {
      const leafArr = document.querySelectorAll('.is-leaf')
      for (let i = 0; i < leafArr.length - 1; i++) {
        leafArr[i].onmousemove = ev => {
          leafArr[i].style.cursor = ''
          // console.log(ev.offsetX)
          // console.log(leafArr[i].offsetWidth)
          if (ev.offsetX > leafArr[i].offsetWidth - 3) {
            leafArr[i].style.cursor = 'col-resize'
          } else {
            leafArr[i].style.cursor = 'move'
          }
        }
      }
    },

    // 行拖拽
    rowDrop() {
      const tbody = document.querySelector(
        '.goodsDetailTable .el-table__body-wrapper tbody'
      )
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
    // 添加监听器
    addThListener() {
      let thArr = document.querySelectorAll(
        '.goodsDetailTable .el-table__header-wrapper th'
      )
      for (let i = this.cantDragColumn; i < thArr.length - 2; i++) {
        let element = thArr[i].childNodes[0]
        if (element.addEventListener) {
          // 所有主流浏览器, 除了 IE 8 及更早 IE 版本
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
        this.addName(element, i)
      }
    },
    // 递归给元素添加属性名
    addName(element, i) {
      element.setAttribute('name', i)
      if (element.children.length > 0) {
        let childNodeArr = element.childNodes
        for (let j = 0; j < childNodeArr.length; j++) {
          if (childNodeArr[j].nodeType === 1) {
            childNodeArr[j].setAttribute('name', i)
          }
          if (childNodeArr[j].hasChildNodes()) {
            this.addName(childNodeArr[j], i)
          }
        }
      }
    },
    // 移除监听器
    reThListener() {
      let thArr = document.querySelectorAll('.goodsDetailTable th')

      for (let i = this.cantDragColumn; i < thArr.length - 2; i++) {
        let element = thArr[i].childNodes[0]
        if (element.removeEventListener) {
          // 所有主流浏览器, 除了 IE 8 及更早 IE 版本
          element.removeEventListener('dragover', this.allowDrop)
          element.removeEventListener('drop', this.drop)
          element.removeEventListener('dragstart', this.drag)
        } else if (element.detachEvent) {
          // IE 8 及更早 IE 版本
          element.detachEvent('dragover', this.allowDrop)
          element.detachEvent('drop', this.drop)
          element.detachEvent('dragstart', this.drag)
        }
      }
    },
    drag(ev) {
      ev.dataTransfer.setData('Text', ev.target.getAttribute('name'))
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      // 阻止默认行为
      ev.preventDefault()
      let oldIndex = ev.target.getAttribute('name')
      let newIndex = ev.dataTransfer.getData('Text')
      // 拖拽时同步弹框表头的顺序
      this.checkCol.splice(
        this.checkCol.findIndex(
          value => value.prop === this.dropCol[oldIndex].prop
        ),
        1,
        ...this.checkCol.splice(
          this.checkCol.findIndex(
            valuenew => valuenew.prop === this.dropCol[newIndex].prop
          ),
          1,
          this.dropCol[oldIndex]
        )
      )

      // 切换表头对应数据
      this.dropCol.splice(
        oldIndex,
        1,
        ...this.dropCol.splice(newIndex, 1, this.dropCol[oldIndex])
      )
      // 每回拖动ElementUI的自定义插槽会清空我的自定义name, 所以重新添加name
      this.$nextTick(() => {
        // 解决表头错位问题
        this.$refs.goodsDetailTable.doLayout()

        let eleArr = document.querySelectorAll(
          '.goodsDetailTable .el-table__header-wrapper th'
        )
        for (let i = 0; i < eleArr.length - 2; i++) {
          let element = eleArr[i].childNodes[0]
          this.addName(element, i)
        }
      })
      this.$emit('drop', this.dropCol, this.checkCol)
    },
    // 列宽记录
    widthRecode(newWidth, oldWidth, column, event) {
      this.$nextTick(() => {
        // 解决表头错位问题
        this.$refs.goodsDetailTable.doLayout()
      })
      this.dropCol.forEach(item => {
        if (item.prop === column.property) {
          item.width = newWidth
        }
      })
      this.$emit(
        'header-dragend',
        newWidth,
        oldWidth,
        column,
        event,
        this.dropCol,
        this.checkCol
      )
    },
    // buttonFu(property) {
    //   this.dropCol.forEach(item => {
    //     if (item.prop === property) {
    //     item.collapse = !item.collapse
    //     }
    //   })
    // },
    buttonFu() {
      this.dropCol.forEach(item => {
        item.collapse = !item.collapse
      })
    },
    // 排序函数
    sortChange({ column, prop, order }) {
      this.dropCol.forEach(item => {
        if (item.prop === prop) {
          item.sort = order
        }
      })
      this.$emit('sort-change', { column, prop, order })
    },
    // 表格操作按钮, 依据type判断
    tableButton(index, row, type) {
      this.$emit(`click`, row, type)
    },
    // bug步骤: 先点击一次确认对话框, 再点开一次确认对话框, 与最后一个拖拽互换顺序
    // 对话框确认按钮点击函数
    confirmCheck() {
      this.$emit('update:dialogShow', { flag: false })
      this.syncArrOrder()
      // 因为数组变了, 所以name的值index也需要跟着变, 所以重新绑定拖放事件
      this.$nextTick(() => {
        // 解决表头错位问题
        this.$refs.goodsDetailTable.doLayout()
        this.addThListener()
      })
      this.$emit('check-header', this.dropCol, this.checkCol)
    },
    // 每次勾选时筛选出勾选项建新数组（初始化时调用而不直接将checkCol赋给dropCol是为了防止checkCol与dropCol相互影响）
    syncArrOrder() {
      this.dropCol = this.checkCol.filter(item => {
        return this.checkedHeaders.find(checkItem => {
          return item.label === checkItem
        })
      })
    },
    // 取消对话框
    cancel() {
      this.$emit('update:dialogShow', { flag: false })
    },
    // 初始化表头弹框选中项(没动dropColInit, 所以应该是没改变父组件数据, 所以这里应该没有问题)
    initCheckedHeaders() {
      this.dropColInit.forEach(item => this.checkedHeaders.push(item.label))
    }
  }
}
</script>

<style lang="less" scoped>
.linkItem {
  color: brown;
}
/deep/.el-table-column--selection .cell {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
