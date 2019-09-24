const Product = require('./../models/product.model')

module.exports.index = async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
};

module.exports.create = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.json(product);
};

module.exports.getbyid = async (req, res, next) => {
  const _id = req.params.id;
  const product = await Product.findById({ _id });
  res.json(product);
};

module.exports.delete = async (req, res, next) => {
  const _id = req.params.id;
  const product = await Product.remove({ _id });
  res.json(product);
};

module.exports.update = async (req, res, next) => {
  const _id = req.params.id;
  const product = await Product.findOneAndUpdate({ _id }, req.body);
  res.json(product);
};


