'use strict';

const Controller = require('egg').Controller;

class StudentController extends Controller {
  async getStudentData() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { student } = ctx.service;
    const pageIndex = parseInt(body.index);
    const pageSize = parseInt(body.size);
    let response;
    if (isNaN(pageSize) && isNaN(pageIndex)) {
    } else {
      response = await student.find(pageIndex, pageSize);
    }
    ctx.body = {
      list: response
    }
  }

  async getStudentCount() {
    const { ctx } = this;
    const { student } = ctx.service;
    const { query } = ctx;
    const pageSize = parseInt(query.size);
    const pageIndex = parseInt(query.index);
    let result;
    if (isNaN(pageSize) && isNaN(pageIndex)) {
    } else {
      result = await student.getCount(pageIndex, pageSize);
    }
    ctx.body = {
      count: result.count,
      list: result.list
    }
  }

  async updateStudent() {
    const { ctx } = this;
    const { body } = ctx.request;
    const sid = body.sid;
    const sname = body.sname;
    const sage = body.sage;
    const ssex = body.ssex;
    const sdept = body.sdept;
    const { student } = ctx.service;
    const row = { sname, ssex, sage, sdept };
    const options = {
      where: {
        sid
      }
    };
    const list = await student.update(row, options);
    ctx.body = { list };
  }

  async deleteStudentById() {
    const { ctx } = this;
    const { body } = ctx.request;
    const { student } = ctx.service;
    const studentList = body.list;
    const status = await student.del(studentList);
    ctx.body = {
      status,
      success: true
    };
  }

  async insertStudent() {
    const { ctx } = this;
    const { body } = ctx.request;
    const sid = body.sid;
    const sname = body.sname;
    const sage = parseInt((new Date() - new Date(body.sage)) / 1000 / (24 * 60 * 60) / 365);
    const ssex = body.ssex;
    const sdept = body.sdept;
    const { student } = ctx.service;
    const status = await student.insert({ sid, sname, ssex, sage, sdept });
    if (status.errno === 1062) {
      let success = false;
      ctx.body = {
        success
      }
    } else {
      let success = true;
      ctx.body = {
        success
      }
    }
  }

}

module.exports = StudentController;
