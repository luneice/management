<template>
  <el-table
    :data="courseTableData"
    style="width: 100%; margin-top: 20px">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="课程号：">
            <span>{{ props.row.cid }}</span>
          </el-form-item>
          <el-form-item label="课程名：">
            <span>{{ props.row.cname }}</span>
          </el-form-item>
          <el-form-item label="课时：">
            <span>{{ props.row.period }}</span>
          </el-form-item>
          <el-form-item label="学分：">
            <span>{{ props.row.credit }}</span>
          </el-form-item>
          <el-form-item label="课程类別：">
            <span>{{ props.row.ctag }}</span>
          </el-form-item>
          <el-form-item label="课程类型：">
            <span>{{ props.row.ctype }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="课程名"
      prop="cname">
    </el-table-column>
    <el-table-column
      label="学分"
      prop="credit">
    </el-table-column>
    <el-table-column
      label="学时"
      prop="period">
    </el-table-column>
    <el-table-column
      label="课程类型"
      prop="ctype">
    </el-table-column>
  </el-table>
</template>

<script>
/* eslint-disable */
import Request from '../assets/request';
export default {
  name: "CourseTable",
  data() {
    return {
      columns: [
        '', '', ''
      ],
      courseTableData: [
        {
          cid: '201500854',
          cname: '数据库',
          credit: '2.0',
          period: '32',
          ctag: '专业课',
          ctype: '必修',
        }
      ]
    }
  },
  async created() {
    var request = new Request();
    var result = await request.get('/e/course/total', {});
    result = JSON.parse(result);
    this.courseTableData = result.result;
  }
}
</script>

<style scoped>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
