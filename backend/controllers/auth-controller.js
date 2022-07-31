const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");

class AuthController {
  async sendOtp(req, res) {
    // Logic

    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone field is required!" });
    }

    const otp = await otpService.generateOtp();

    // Hash
    const ttl = 1000 * 60 * 2; // 2 min
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = await hashService.hashOtp(data);

    try {
      res.json({
        phone,
        otp,
        hash,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "message sending failed" });
    }
  }
}

module.exports = new AuthController();
