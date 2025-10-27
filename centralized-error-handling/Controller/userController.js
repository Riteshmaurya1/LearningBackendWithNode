const { sendErrorResponse, sendResponce } = require("../utils/response");
const getUser = (req, res) => {
  try {
    const id = req.params.id;
    if (id > 5) {
      let err = new Error("User Not Found");
      err.statusCode = 404;
      throw err;
      // return sendErrorResponse(res, {
      //   message: "User Not Found",
      //   statusCode: 404,
      // });
    }
    return sendResponce(res, id, 200);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
};

const createUser = (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      let err = new Error("Name is required!.");
      err.statusCode = 400;
      throw err;
      // return sendErrorResponse(res, {
      //   message: "Name is required!.",
      //   statusCode: 400,
      // });
    }
    let user = { id: 1, name };
    return sendResponce(res, user, 201);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
};

module.exports = {
  getUser,
  createUser,
};
