const router = require("express").Router();
const { validateCreate, validateLogin } = require("../middlewares/users");

const jwt = require("jsonwebtoken");
const Dao = require("../database/dao/users");

const SECRET_TOKEN = "s3cr3tT0k3n";

router.post("/", validateCreate, async (req, res) => {
  try {
    const user = await Dao.findByEmailOrUsername(req.body);
    if (user.length)
      return res.status(409).json({ error: "Resource already exists." });

    await Dao.create(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  try {
    const { password } = req.body;

    const user = await Dao.findByEmailOrUsername(req.body);
    if (!user.length)
      return res.status(401).json({ error: "Bad credentials." });

    if (user[0].password !== password)
      return res.status(401).json({ error: "Bad credentials." });

    const token = jwt.sign(
      { id: user[0].id, roleId: user[0].roleId },
      SECRET_TOKEN
    );
    return res.header("auth-token", token).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
