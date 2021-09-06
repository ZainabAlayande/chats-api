const router = require("express").Router();

const { Auth } = require("../middleware"); //Auhorization middleware
const { AuthController } = require("../controllers");

const multer = require("../middleware/multer-config"); //for uploading of profile picture and fingerprint
const e2e = require("../middleware/e2e"); //End2End Encryption middleware
const { AuthValidator } = require("../validators");
// router.use(e2e);



router.post("/register", AuthController.createBeneficiary);
router.post("/self-registration", AuthController.beneficiaryRegisterSelf);
router.post("/ngo-register", AuthController.createNgoAccount);
router.post("/register/special-case", AuthController.sCaseCreateBeneficiary);
router.post("/nin-verification", AuthController.verifyNin);
router.post("/update-profile", Auth, AuthController.updateProfile);
router.get("/user-detail/:id", Auth, AuthController.userDetails);

// Refactored
router.post("/login", AuthController.signIn);
router.get('/2fa/init', Auth, AuthController.setTwoFactorSecret);
router.post('/2fa/enable', Auth, AuthController.enableTwoFactorAuth);

router.route('/password/reset')
  .post(
    AuthValidator.requestPasswordResetRules(),
    AuthValidator.validate,
    AuthValidator.canResetPassword,
    AuthController.requestPasswordReset
  )
  .put(
    AuthValidator.resetPasswordRules(),
    AuthValidator.validate,
    AuthValidator.checkResetPasswordToken,
    AuthController.resetPassword
  )

module.exports = router;