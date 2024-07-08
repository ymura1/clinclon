import AutheModels from "../models/authModels";

class AuthControllers {
  models: AutheModels;

  constructor() {
    this.models = new AutheModels();
  }

  async signUp(req: any, res: any) {
    const isUserRegistered = await this.models.isUserRegistered(req.body.email);
    if (isUserRegistered) {
      res.status(400).json({ error: "This email is already used" });
      return;
    }
    const response = await this.models.signUp(req.body);
    response
    ? res.sendStatus(200)
    : res.status(400).json({ error: "Failed to sign up" });
  }

  async signIn(req: any, res: any) {
    const { email, password } = req.body;
    console.log(email, password)
    const isUserRegistered = await this.models.isUserRegistered(email);
    if (!isUserRegistered) {
      res.status(400).json({ error: "Incorrect email address or password" });
      return;
    }
    const isPasswordMatch = await this.models.isPasswordMatch(email, password);
    if (!isPasswordMatch) {
      res.status(400).json({ error: "Incorrect email address or password" });
      return;
    }
    res.status(200).send("successfully login");
  }

  // async sendOtp(req: any, res: any) {
  //   const { email } = req.body;
  //   const isRegistered = await this.models.isOwnerRegistered(email);
  //   if (!isRegistered) {
  //     res
  //       .status(400)
  //       .json({ error: "This user is not registered. Please sign up" });
  //     return;
  //   }
  //   const otp = await this.models.sendOtp(email);
  //   const response = await this.models.storeOtp(email, otp);
  //   response ? res.status(200).send({ otp }) : res.sendStatus(400);
  // }

  async resendOTP(req: any, res: any) {
    const { email } = req.body;
    const otp = await this.models.sendOtp(email);
    const response = await this.models.updateOtp(email);
    response ? res.status(200).send({ otp }) : res.sendStatus(400);
  }

  async validateCode(req: any, res: any) {
    const isExpired = await this.models.validateCodeExpiration(req.body);
    if (!isExpired) {
      res
        .status(400)
        .json({ error: "Code is expired. You must create a new one" });
      return;
    }
    const isMatch = await this.models.validateCodeMatch(req.body);
    if (!isMatch) {
      res.status(400).json({ error: "Code does not match" });
      return;
    }
    res.sendStatus(200);
  }

  async validatePassword(req: any, res: any) {
    const isPasswordSame = await this.models.isPasswordSame(req.body);
    if (isPasswordSame) {
      res.status(400).json({ error: "You cannot use the previous password" });
      return;
    }
    res.status(200);
  }

  async resetPassword(req: any, res: any) {
    const response = await this.models.resetPassword(req.body);
    response
      ? res.sendStatus(200)
      : res.status(400).json({ error: "Failed to reset password"});
  }
}

export default AuthControllers;
