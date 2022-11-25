function getPrivateData(req, res, next) {
  res.status(200).json({
    data: "You've got access to the private data in this route",
  });
}

module.exports = { getPrivateData };
