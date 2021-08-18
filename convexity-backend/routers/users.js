const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const {Auth} = require("../middleware/main-auth");
const e2e = require("../middleware/e2e"); //End2End Encryption middleware
router.use(e2e);

router.get("/", Auth, UsersController.getAllUsers);
router.post("/", Auth, UsersController.addUser);
router.get("/:id", Auth, UsersController.getAUser);
router.put("/profile", Auth, UsersController.updatedUser);
router.put("/profile-image", Auth, UsersController.updateProfileImage);
router.put("/nfc_update", Auth, UsersController.updateNFC);
router.delete("/:id", Auth, UsersController.deleteUser);
router.get( "/transactions/:beneficiary", Auth, UsersController.getBeneficiaryTransactions );
router.get( "/recent_transactions/:beneficiary", Auth, UsersController.getRecentTransactions );
router.get("/transaction/:uuid", Auth, UsersController.getTransaction);
router.get( "/transactions/recieved/:id", Auth, UsersController.getTotalAmountRecieved );
router.post("/transact", Auth, UsersController.transact);
router.get("/info/statistics", Auth, UsersController.getStats);
router.get("/info/chart", Auth, UsersController.getChartData);
router.get("/info/wallet-balance/:id", Auth, UsersController.getWalletBalance);
router.post("/product/cart", Auth, UsersController.addToCart);
router.get("/cart/:userId", Auth, UsersController.getCart);
router.post("/cart/checkout", Auth, UsersController.checkOut);
router.get("/types/count", Auth, UsersController.countUserTypes);
router.post("/reset-password", UsersController.resetPassword);
router.post("/update-password", Auth, UsersController.updatePassword);
router.post("/update-pin", Auth, UsersController.updatePin);
router.get("/financials/summary/:id", Auth, UsersController.getSummary);
router.get("/pending/orders/:userId", Auth, UsersController.fetchPendingOrder);
router.post("/action/deactivate", Auth, UsersController.deactivate);

module.exports = router;
