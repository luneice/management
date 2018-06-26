/**
 * Created by luneice on 18-6-25.
 */

'use strict';

const Service = require('egg').Service;

module.exports = class ScoreService extends Service{
  async find() {
    const { mysql } = this.app;
    return await mysql.select("sourse");
  }
};
