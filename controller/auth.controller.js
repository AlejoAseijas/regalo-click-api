const postAuth = async (req, res) => {
  try {
    if (
      req.body.user === process.env.userAdmin &&
      req.body.password === process.env.passwordAdmin
    ) {
      res.status(201).json({ auth: true });
    } else {
      res.status(401).json({ auth: false });
    }
  } catch (err) {
    res.status(401).json({ err: "error to logIn" });
  }
};

export { postAuth };
