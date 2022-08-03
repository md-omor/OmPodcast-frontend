const hashService = require("../services/hash-service");
const otpService = require("../services/otp-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");

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

    // send otp
    try {
      // await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "message sending failed" });
    }
  }

  async verifyOtp(req, res) {
    // Logic

    const { phone, otp, hash } = req.body;

    if (!phone || !otp || !hash) {
      res.status(400).json({ message: "All fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      res.status(400).json({ message: "Otp expired" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    let user;
    // let accessToken;

    try {
      user = userService.findUser({ phone });
      if (!user) {
        user = await userService.creatUser({ phone });
      }
    } catch (error) {
      console.log(error, "");
      res.status(500).json({ message: "Database Error" });
    }

    //Token

    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.json({ accessToken });
  }
}

module.exports = new AuthController();
