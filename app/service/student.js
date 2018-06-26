/**
 * Created by luneice on 18-6-21.
 */

'use strict';

const Service = require('egg').Service;

class StudentService extends Service {
  async update(row, options) {
    const { mysql } = this.app;
    return await mysql.update('student', row, options);
  }

  async find(pageIndex, pageSize) {
    const { mysql } = this.app;
    return await mysql.select('student', {
      limit: pageSize, // 返回数据量
      offset: pageSize * (pageIndex - 1), // 数据偏移量
    });
  }

  async getCount(pageIndex, pageSize) {
    const { mysql } = this.app;
    const count = await mysql.select('student');
    const list = await mysql.select('student', {
      limit: pageSize, // 返回数据量
      offset: pageSize * (pageIndex - 1), // 数据偏移量
    });
    return {
      count: count.length,
      list
    };
  }

  async del(row) {
    const { mysql } = this.app;
    const len = row.length;
    let sql = 'delete from student where sid = " 0000 "';
    for (let i = 0; i < len; ++i) {
      sql += ' or sid = "' + row[i] + '"';
    }
    return await mysql.query(sql);
  }

  async insert(row) {
    const { mysql } = this.app;
    try {
      return await mysql.insert("student", row);
    }catch (e) {
      return e;
    }

  }
}

module.exports = StudentService;
