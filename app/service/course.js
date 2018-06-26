/**
 * Created by luneice on 18-6-24.
 */

'use strict';

const Service = require('egg').Service;

module.exports = class CourseService extends Service{
  async find() {
    const { mysql } = this.app;
    return await mysql.select("course");
  }
};
