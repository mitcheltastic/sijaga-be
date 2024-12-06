const {
    createSijaga,
    getSijagaByUserId,
    updateSijagaStatus,
  } = require("../repository/userAuthRepository");
  
  const createSijagaService = async (name, status, userId) => {
    return await createSijaga(name, status, userId);
  };
  
  const getSijagaByUserIdService = async (userId) => {
    const sijagaRecords = await getSijagaByUserId(userId);
    if (sijagaRecords.length === 0) {
      throw new Error("No Sijaga records found for this user.");
    }
    return sijagaRecords;
  };
  
  const updateSijagaStatusService = async (id, status) => {
    return await updateSijagaStatus(id, status);
  };
  
  module.exports = {
    createSijagaService,
    getSijagaByUserIdService,
    updateSijagaStatusService,
  };
  