'use strict';

/**
 * @param app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/student/update', controller.student.updateStudent);
  router.post('/student/more', controller.student.getStudentData);
  router.get('/student/total', controller.student.getStudentCount);
  router.post('/student/del', controller.student.deleteStudentById);
  router.post('/student/insert', controller.student.insertStudent);

  router.get('/course/total', controller.course.getCourse);
};
