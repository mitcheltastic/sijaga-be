const { createUserService, deleteUserService } = require("../service/userAuthService");

// Controller to create a user
const createUserController = async (req, res) => {
  try {
    const { name, email, cardId } = req.body;

    // Call service to create the user
    const user = await createUserService(name, email, cardId);

    res.status(201).json({
      status: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// Controller to delete a user
const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Call service to delete the user
    const deletedUser = await deleteUserService(Number(userId));

    res.status(200).json({
      status: true,
      message: "User deleted successfully.",
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { createUserController, deleteUserController };
