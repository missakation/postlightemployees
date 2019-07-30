import { Router } from 'express'
import controllers from './employees.controllers'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
})

//GET ONLY IMAGES
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

//MULTER CONFIGURATION
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const router = Router()

// /api/list
router
  .route('/')
  .get(controllers.getMany)
  .post(upload.single('media'), controllers.createOne)

// /api/list/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(upload.single('media'), controllers.updateOne)
  .delete(controllers.removeOne)

export default router
