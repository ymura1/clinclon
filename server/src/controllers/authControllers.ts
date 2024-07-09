import AutheModels from "../models/authModels";

class AuthControllers {
  models: AutheModels;

  constructor() {
    this.models = new AutheModels();
  }

  async isUserRegistered(req: any, res: any) {
    const { email } = req.body;
    const isUserRegistered = await this.models.isUserRegistered(email);
    if (isUserRegistered) {
      res.status(400).json({ error: "This email is already used" });
      return;
    }

    const otp = this.models.generateOtp();
    // console.log('generated otp', otp, email)
    // await this.models.storeOtp(email, otp);
    (await this.models.sendOtp(email, otp))
      ? res.status(200).json({ otp })
      : res.status(400).json({ error: "Failed to send otp" });
  }

  async signUp(req: any, res: any) {
    (await this.models.signUp(req.body))
      ? res.sendStatus(200)
      : res.status(400).json({ error: "Failed to sign up" });
  }

  async signIn(req: any, res: any) {
    const { email, password } = req.body;
    const usersname = await this.models.getName(email);
    console.log("users name", usersname, usersname.length);
    if (!usersname.length) {
      res.status(400).json({ error: "Incorrect email address or password" });
      return;
    }
    const isPasswordMatch = await this.models.isPasswordMatch(email, password);
    if (!isPasswordMatch) {
      res.status(400).json({ error: "Incorrect email address or password" });
      return;
    }
    res
      .status(200)
      .send({
        firstName: usersname[0].first_name,
        lastName: usersname[0].last_name,
      });
  }

  async resendOTP(req: any, res: any) {
    // generate otp
    const { email } = req.body;
    const otp = this.models.generateOtp();
    // send otp
    if (await this.models.sendOtp(email, otp)) {
      // update otp
      await this.models.updateOtp(email, otp);
    }
    // const response = await this.models.updateOtp(email);
    // response ? res.status(200).send({ otp }) : res.sendStatus(400);
  }

  async resetPassword(req: any, res: any) {
    const response = await this.models.resetPassword(req.body);
    response
      ? res.sendStatus(200)
      : res.status(400).json({ error: "Failed to reset password" });
  }
}

export default AuthControllers;
