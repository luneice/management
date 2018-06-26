/**
 * Created by luneice on 18-6-25.
 */

'use strict';

const Controller = require('egg').Controller;

module.exports =  class ScoreController extends Controller {
  async getCourse() {
    const { ctx } = this;
    const { course } = ctx.service;
    const result = await course.find();
    ctx.body = {
      result
    }
  }
};
