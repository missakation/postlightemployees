import config from '../config'

export const getOne = model => async (req, res) => {
  try {
    const doc = await model
      // .findOne({ createdBy: req.user._id, _id: req.params.id })
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = model => async (req, res) => {

  try {

    var params = {};
    var pageNumber = 1;
    var rowsPerPage = 1000;
    //params.createdBy = req.user._id;

    pageNumber = req.query.hasOwnProperty('page') ? Number(req.query['page']) : 1;
    rowsPerPage = req.query.hasOwnProperty('rowsPerPage') ? Number(req.query['rowsPerPage']) : 1000;

    delete req.query.page;
    delete req.query.rowsPerPage;

    //CREATE QUERY PARAMS OBJECTS
    if (req.query != undefined && req.query != null) {
      for (const [key, value] of Object.entries(req.query)) {
        params[key] = new RegExp("^" + value);
      }
    }

    const docs = await model
      .find(params)
      .skip((pageNumber - 1) * rowsPerPage)
      .limit(rowsPerPage)
      .lean()
      .exec()

    var count = await model
      .find(params)
      .count();

    res.status(200).json(
      {
        data: docs,
        pages: {
          count: count,
          currentPage: pageNumber,
          rowsPerPage: rowsPerPage
        }
      }
    )
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {

  const createdBy = req.user._id

  if (req.file) {
    req.body.mediaUrl = req.file.path;
    req.body.mediaUrlFull = `http://localhost:${config.port}/` + req.file.path;
  }

  try {

    const doc = await model.create({ ...req.body, createdBy })

    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateOne = model => async (req, res) => {

  if (req.file) {
    req.body.mediaUrl = req.file.path;
    req.body.mediaUrlFull = `http://localhost:${config.port}/` + req.file.path;
  }

  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          //createdBy: req.user._id,
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      //createdBy: req.user._id, //uncomment if only delete mine
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
