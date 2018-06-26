<template>
  <div style="margin: 20px 10px; text-align: center;">
    <div class="edit-cont">
      <input class="edit-comm edit-del" @click="changeDialogStatus" type="button" value="删除"/>
      <input class="edit-comm edit-add" @click="formVisible = true" type="button" value="添加"/>
    </div>
    <el-dialog title="添加学生信息" :visible.sync="formVisible" width="30%">
      <el-form style="text-align: left;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="学生学号" prop="sid">
          <el-input v-model="ruleForm.sid"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="sname">
          <el-input type="sname" v-model="ruleForm.sname"></el-input>
        </el-form-item>
        <el-form-item label="学生院系" prop="sdept">
          <el-select v-model="ruleForm.sdept" placeholder="学生院系" style="width: 100%;">
            <el-option label="电气与信息工程学院" value="电气与信息工程学院"></el-option>
            <el-option label="经济管理学院" value="经济管理学院"></el-option>
            <el-option label="机械学院" value="机械学院"></el-option>
            <el-option label="理学院" value="理学院"></el-option>
            <el-option label="马克思学院" value="马克思学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择生日" required>
          <el-col>
            <el-form-item prop="sage">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.sage" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="学生性别" prop="ssex">
          <el-radio-group v-model="ruleForm.ssex" required>
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="danger" @click="formVisible = false">取 消</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">创 建</el-button>
  </span>
    </el-dialog>
    <v-table
      is-horizontal-resize
      column-width-drag
      :is-loading="isLoading"
      style="width:100%"
      :columns="columns"
      :table-data="tableData"
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :select-all="selectALL"
      :select-group-change="selectGroupChange"
      :cell-edit-done="cellEditDone"
    ></v-table>
    <div class="edit-cont">
      <input class="edit-comm edit-del" @click="changeDialogStatus" type="button" value="删除"/>
      <input class="edit-comm edit-add" @click="formVisible = true" type="button" value="添加"/>
    </div>
    <v-pagination :total="itemTotal"
                  @page-change="pageChange"
                  @page-size-change="pageSizeChange"
                  style="margin-top: 20px"
    ></v-pagination>
  </div>
</template>

<script>
/* eslint-disable */
  import Request from '../assets/request';
  
  export default {
    sname: "Table",
    data() {
      return {
        request: new Request(),
        formVisible: false,
        ruleForm: {
          sid: '',
          sname: '',
          sdept: '',
          sage: '',
          ssex: '',
        },
        rules: {
          sid: [
            { required: true, message: '请输入学生学号', trigger: 'blur' },
            { min: 9, max: 11, message: '长度在 9 到 11 个数字', trigger: 'blur' }
          ],
          sname: [
            { required: true, message: '请输入学生姓名', trigger: 'blur' }
          ],
          sage: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          sdept: [
            { required: true, message: '请选择学生院系', trigger: 'change' }
          ],
          ssex: [
            { required: true, message: '请选择学生性别', trigger: 'change' }
          ]
        },
        dialogVisible: false,
        isLoading: true,
        itemTotal: 0,
        pageIndex: 1,
        pageSize: 10,
        selectList: [],
        dataBuffer: [],
        tableData: [],
        columns: [
          {
            width: 60, titleAlign: 'center', columnAlign:'center', type: 'selection', isFrozen:true
          },
          {
            field: 'sid', title: '学号', width: 80, titleAlign: 'center', columnAlign: 'center', isResize:true, isEdit:false,
            formatter: function(rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color'>${rowData[field]}</span>`;
            }
          },
          {
            field: 'sname', title: '姓名', width: 80, titleAlign: 'center', columnAlign: 'center', isResize:true, isEdit:true,
            formatter: function(rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color'>${rowData[field]}</span>`;
            }
          },
          {
            field: 'ssex', title: '性别', width: 60, titleAlign: 'center', columnAlign: 'center', isResize:true, isEdit:true,
            formatter: function(rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color'>${rowData[field]}</span>`;
            }
          },
          {
            field: 'sage', title: '年龄', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true,
            formatter: function(rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color'>${rowData[field]}</span>`;
            }
          },
          {
            field: 'sdept', title: '所属系別', width: 280, titleAlign: 'center', columnAlign: 'left', isResize: true, isEdit: true,
            formatter: function(rowData,rowIndex,pagingIndex,field) {
              return `<span class='cell-edit-color'>${rowData[field]}</span>`;
            }
          }
        ]
      }
    },
    methods:{
      async initData(pageSize) {
        var result = await this.request.get('/e/student/total', {
          index: this.pageIndex,
          size: this.pageSize
        });
        result = JSON.parse(result);
        console.log(result);
        this.itemTotal = result.count;
        this.tableData = result.list;
        this.pageSize = pageSize || 10;
        this.isLoading = false;
      },
      updateTableData() {
        this.tableData = this.dataBuffer;
      },
      getSelectionIndex(selection) {
        var selectionIndex = [];
        for (var i in selection) {
          selectionIndex.push(selection[i].sid);
        }
        var selectionSet = new Set(selectionIndex);
        var dataBuffer = [];
        for (var item of this.tableData) {
          if (!selectionSet.has(item.sid)) {
            dataBuffer.push(item);
          }
        }
        this.dataBuffer = dataBuffer;
        this.selectList = selectionIndex;
      },
      selectALL(selection) {
        this.getSelectionIndex(selection);
      },
      selectGroupChange(selection) {
        this.getSelectionIndex(selection);
      },
      async cellEditDone(newValue, oldValue, rowIndex, rowData, field) {
        this.tableData[rowIndex][field] = newValue.trim();
        // 接下来处理你的业务逻辑，数据持久化等...
        var result = null;
        if (newValue.trim() !== oldValue) {
          result = await this.request.post('/e/student/update', this.tableData[rowIndex]);
          result = JSON.parse(result);
        }
      },
      async getTableData() {
        // 从数据库中获取新的数据
        this.isLoading = true;
        var result = await this.request.post('/e/student/more', { index: this.pageIndex, size: this.pageSize });
        result = JSON.parse(result);
        this.isLoading = false;
        this.tableData = result.list;
        // this.tableData = this.tableData.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
      },
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getTableData();
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
      },
      async delRows() {
        var len = this.selectList.length;
        if (len > 0) {
          var result = await this.request.post('/e/student/del', { list: this.selectList });
          result = JSON.parse(result);
          if (result.success) {
            this.selectList = [];
            this.updateTableData();
            this.initData(this.pageSize);
          }
        }
      },
      changeDialogStatus() {
        if (this.selectList.length === 0 ) return;
        this.$confirm('此操作将永久学生信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delRows();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            var result = await this.request.post('/e/student/insert', this.ruleForm);
            result = JSON.parse(result);
            if (result.success) {
              this.$message({
                type: 'success',
                message: '添加学生成功!'
              });
            } else {
              this.$message({
                type: 'info',
                message: '添加学生失败...'
              });
            }
            this.formVisible = false;
          } else {
            
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.initData();
    }
  }
</script>

<style scoped>
  .cell-edit-color {
    color:#2db7f5;
    font-weight: bold;
  }
  .edit-cont {
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: left;
  }
  .edit-comm {
    height: 32px;
    width: 70px;
    border: 1px solid #c8cdd4;
    background-color: #fff;
    margin-right: 5px;
    font-size: 14px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
  .edit-comm:hover {
    transition: all .1s ease-in-out;
    background-color: #0092dd;
    border: 1px solid #0092dd;
    color: aliceblue;
  }

</style>
