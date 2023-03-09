const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// add prefix of `/users` to routes created in `userRoutes.js`
router.use("/users", userRoutes);
// add prefix of `/thoughts` to routes created in `thoughtRoutes.js`
router.use("/thoughts", thoughtRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>404 Error!</h1>");
});

module.exports = router;
