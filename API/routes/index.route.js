const indexController = require('../controllers/index.controller');
const indexMiddleware = require('../middlewares/index.middleware');
module.exports = (app) => {
  // LOai
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

  // Nhom
  app
    .route('/api/v0/nhoms')
    .get(indexController.nhomController.getDanhSachNhom)
    .post(
      indexMiddleware.nhomMiddleware.checkDuplicateCodeNhom,
      indexController.nhomController.addNhom
    )
    .put(indexController.nhomController.createList);
  app
    .route('/api/v0/nhom/:nhom_id')
    .get(indexController.nhomController.getNhom)
    .post(
      indexMiddleware.nhomMiddleware.checkMonAnExistInNhom,
      indexController.nhomController.changeNhom
    )
    .delete(
      indexMiddleware.nhomMiddleware.checkMonAnExistInNhom,
      indexController.nhomController.removeNhom
    );
};
