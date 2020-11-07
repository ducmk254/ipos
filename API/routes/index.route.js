const indexController = require('../controllers/index.controller');
const indexMiddleware = require('../middlewares/index.middleware');
module.exports = (app) => {
  app
    .route('/api/v0/loais')
    .get(indexController.loaiController.getDanhSachLoai)
    .post(
      indexMiddleware.loaiMiddleware.checkDuplicateCodeLoai,
      indexController.loaiController.addLoai
    )
    .put(indexController.loaiController.createList);
  app
    .route('/api/v0/loai/:loai_id')
    .get(indexController.loaiController.getLoai)
    .post(
      indexMiddleware.loaiMiddleware.checkMonAnExistInLoai,
      indexController.loaiController.changeLoai
    )
    .delete(
      indexMiddleware.loaiMiddleware.checkMonAnExistInLoai,
      indexController.loaiController.removeLoai
    );
};
