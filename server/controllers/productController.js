const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
       await img.mv(path.resolve(__dirname, "..", "static", fileName));
      const product = await Product.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        const productInfo = JSON.parse(info);

        await Promise.all(productInfo.map((i) =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        ));
      }

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    const order = [['id', 'DESC']];
    let options = { limit, offset, order };

    if (brandId) options.where = { ...options.where, brandId };
    if (typeId) options.where = { ...options.where, typeId };

    const products = await Product.findAndCountAll(options);
    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'info' }],
    });
    return res.json(product);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findOne({ where: { id } })
      if (!product) {
        return next(ApiError.badRequest('Produto não encontrado'))
      }
      await product.destroy()
      return res.json({ message: 'Produto deletado com sucesso' })
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ProductController();
