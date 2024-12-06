const {
    createSijagaService,
    getSijagaByUserIdService,
    updateSijagaStatusService,
  } = require("../service/userAuthService");
  
  // Create a Sijaga record
  const createSijagaController = async (req, res) => {
    try {
      const { name, status, userId } = req.body;
      const sijaga = await createSijagaService(name, status, userId);
      res.status(201).json({
        status: true,
        message: "Sijaga record created successfully.",
        data: sijaga,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
  
  // Get Sijaga records by User ID
  const getSijagaByUserIdController = async (req, res) => {
    try {
      const { userId } = req.params;
      const sijagaRecords = await getSijagaByUserIdService(userId);
      res.status(200).json({
        status: true,
        message: "Sijaga records fetched successfully.",
        data: sijagaRecords,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error.message,
      });
    }
  };
  
  // Update a Sijaga record's status
  const updateSijagaStatusController = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedSijaga = await updateSijagaStatusService(id, status);
      res.status(200).json({
        status: true,
        message: "Sijaga status updated successfully.",
        data: updatedSijaga,
      });
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    createSijagaController,
    getSijagaByUserIdController,
    updateSijagaStatusController,
  };
  