const router = require("express").Router();

const { validateToken, validatePermissions } = require("../middlewares/users");

const { validateRequest } = require("../middlewares/products");

const Dao = require("../database/dao/products");

router.post(
  "/",
  validateRequest,
  validateToken,
  validatePermissions,
  async (req, res) => {
    try {
      await Dao.create(req.body);
      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/", validateToken, async (req, res) => {
  try {
    const products = await Dao.findAll();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(
  "/:id",
  validateRequest,
  validateToken,
  validatePermissions,
  async (req, res) => {
    try {
      const { id } = req.params;

      let product = await Dao.findOneById(id);
      if (!product.length)
        return res.status(404).json({ error: "Resource does not exist." });

      await Dao.update(id, req.body);

      res.json(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/:id", validateToken, validatePermissions, async (req, res) => {
  try {
    const { id } = req.params;

    let product = await Dao.findOneById(id);
    if (!product.length)
      return res.status(404).json({ error: "Resource does not exist." });

    await Dao.remove(id);

    res.json({ message: "Resource removed successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
