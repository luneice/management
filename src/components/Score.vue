<template>
  <el-container style="margin-top: 20px;">
    <el-aside width="35%">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="35">
        </el-table-column>
        <el-table-column
          prop="sid"
          label="学号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sdept"
          label="院系">
        </el-table-column>
      </el-table>
    </el-aside>
    <el-main width="65%">
      <ve-radar :data="chartData"></ve-radar>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */
import request from '../assets/request';
export default {
  sname: "Score",
  data () {
    return {
      multipleSelection: [],
      tableData: [
        {
          sid: '201400000',
          sname: '王大虎',
          sdept: '电气与信息工程学院',
          score:  {
            '图例': '王大虎', '软件工程': 69, '数据结构': 77, '高级程序设计': 67, '企业资源管理': 92, '平面设计': 81
          }
      
        },
        {
          sid: '201400001',
          sname: '王小虎',
          sdept: '经济管理学院',
          score:  {
            '图例': '王小虎', '软件工程': 87, '数据结构': 74, '高级程序设计': 72, '企业资源管理': 66, '平面设计': 90
          }
        },
        {
          sid: '201400002',
          sname: '王马虎',
          sdept: '机械学院',
          score:  {
            '图例': '王马虎', '软件工程': 92, '数据结构': 78, '高级程序设计': 76, '企业资源管理': 81, '平面设计': 85
          }
        },
        {
          sid: '201400003',
          sname: '王胖虎',
          sdept: '理学院',
          score:  {
            '图例': '王胖虎', '软件工程': 86, '数据结构': 63, '高级程序设计': 81, '企业资源管理': 92, '平面设计': 79
          }
        },
        {
          sid: '201400004',
          sname: '王飞虎',
          sdept: '马克思学院',
          score:  {
            '图例': '王飞虎', '软件工程': 84, '数据结构': 78, '高级程序设计': 69, '企业资源管理': 77, '平面设计': 88
          }
        }
      ],
      chartData: {
        columns: [
          '图例',
          '软件工程',
          '数据结构',
          '高级程序设计',
          '企业资源管理',
          '平面设计'
        ],
        rows: []
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.chartData.rows = [];
      for (var item of val) {
        this.chartData.rows.push(item.score);
      }
      console.log(this.chartData.rows)
    }
  }
}
</script>

<style scoped>

</style>
