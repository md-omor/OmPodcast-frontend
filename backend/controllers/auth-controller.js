const otpService = require("../services/otp-service");

class AuthController {
  async sendOtp(req, res) {
    // Logic

    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone field is required!" });
    }

    const otp = await otpService.generateOtp();

    try {
      res.json({
        phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "message sending failed" });
    }
  }
}

module.exports = new AuthController();
