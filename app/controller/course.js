/**
 * Created by luneice on 18-6-24.
 */
'use strict';

const Controller = require('egg').Controller;

module.exports =  class CourseController extends Controller {
  async getCourse() {
    const { ctx } = this;
    const { course } = ctx.service;
    const result = await course.find();
    ctx.body = {
      result
    }
  }
};
