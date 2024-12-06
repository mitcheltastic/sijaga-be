const { createSijagaService } = require("../service/userAuthService");

const createSijagaController = async (req, res) => {
  try {
    const { name, email, status, cardId } = req.body;

    // Call service to create the user and Sijaga record
    const sijaga = await createSijagaService(name, email, status, cardId);

    res.status(201).json({
      status: true,
      message: "User and Sijaga record created successfully.",
      data: sijaga,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { createSijagaController };
