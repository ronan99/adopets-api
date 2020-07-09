const { Product } = require("../models")

class ProductController {
    async index(req, res) {
        var { offset, limit } = req.body;

        if (!offset) offset = 0;
        if (!limit) limit = 20

        const products = await Product.findAll({
            offset: offset,
            limit: limit
        });
        return res.json(products)

    }
    async store(req, res) {
        const { name, description, category, price, stock } = req.body;

        if (!name) return res.status(401).json({ error: "Name required!" })
        if (!category) return res.status(401).json({ error: "Category required!" })
        if (!price) return res.status(401).json({ error: "Price required!" })


        const product = await Product.create({ name, description, category, price, stock });

        return res.json(product);



    }
    async update(req, res) {
        const { name, description, category, price, stock } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(401).json({ error: "Id required!" })
        }

        const product = await Product.update({ name, description, category, price, stock }, {
            where: {
                id: id
            }
        })

        return res.json(product);
    }
    async remove(req, res) {
        const { id } = req.params;

        const product = await Product.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).json(product);
    }
}

module.exports = new ProductController();