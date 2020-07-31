<template>
  <div class="table">
    <table border="1">
      <tr>
        <th
          v-for="(item,index) in col"
          :key="index"
          @dragover="allowDrop($event)"
          @drop="drop($event)"
          :draggable="true"
          @dragstart="drag($event)"
          :id="index"
        >{{item.label}}</th>
      </tr>
      <tr v-for="(item,index) in tableData" :key="index">
        <td v-for="(itemTd,indexTd) in dropCol" :key="indexTd">{{item[dropCol[indexTd].prop]}}</td>
      </tr>
    </table>
    <!-- <table>
      <tr>
        <th
          @dragover="allowDrop($event)"
          @drop="drop($event)"
          :draggable="true"
          @dragstart="drag($event)"
          id="th1"
        >猪一号</th>
        <th
          @dragover="allowDrop($event)"
          @drop="drop($event)"
          :draggable="true"
          @dragstart="drag($event)"
          id="th2"
        >狗一号</th>
      </tr>
      <tr>
        <td>猪猪</td>
        <td>狗狗</td>
      </tr>
      <tr>
        <td>猪猪</td>
        <td>狗狗</td>
      </tr>
    </table>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      col: [
        {
          label: "日期",
          prop: "date"
        },
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      dropCol: [
        {
          label: "日期",
          prop: "date"
        },
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 100 弄"
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 200 弄"
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 300 弄"
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 400 弄"
        }
      ]
    };
  },
  methods: {
    drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    drop(ev) {
      console.log(ev.dataTransfer.getData("Text"));
      console.log(ev.target.id);
      // 阻止默认行为
      ev.preventDefault();
      // 切换表头内容
      var data = ev.dataTransfer.getData("Text");
      let textOld = ev.target.innerText;
      ev.target.innerText = document.getElementById(data).innerText;
      document.getElementById(data).innerText = textOld;
      // 切换表头对应数据
      let newIndex = ev.target.id;
      let oldIndex = ev.dataTransfer.getData("Text");
      // console.log(this.dropCol[oldIndex].label);
      // console.log(this.dropCol[newIndex].label);

      // const oldItem = this.dropCol[oldIndex];
      this.dropCol.splice(
        oldIndex,
        1,
        ...this.dropCol.splice(newIndex, 1, this.dropCol[oldIndex])
      );
      // this.dropCol.splice(oldIndex, 1);
      // this.dropCol.splice(newIndex, 0, oldItem);
    }
  }
};
</script>

<style>
</style>