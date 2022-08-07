const Jimp = require("jimp");
const path = require("path");
const userService = require("../services/user-service");
const UserDto = require("../dtos/user-dto");

class ActivateController {
  async activate(req, res) {
    // Activation logic
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required." });
    }

    // Image Base64
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    // 32478362874-3242342342343432.png

    try {
      const jimpResp = await Jimp.read(buffer);
      jimpResp
        .resize(250, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (error) {
      res.status(500).json({ message: "Could not process the image" });
    }

    const usesId = req.user._id;
    console.log(usesId);

    // Update User
    try {
      const user = await userService.findUser({ _id: usesId });
      if (!user) {
        res.status(404).json({ message: "User Not Found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDto(user), auth: true });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
}

module.exports = new ActivateController();
