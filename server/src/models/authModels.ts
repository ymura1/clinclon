import AuthRepositories from "../repositories/authRepositories";
import { EmployerInterface } from "../interfaces/EmployerInterface";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

class AutheModels {
  repositories: AuthRepositories;

  constructor() {
    this.repositories = new AuthRepositories();
  }

  async isEmployerRegistered(email: string) {
    const userId = await this.repositories.getUserId(email);
    if (!userId) return false;
    return await this.repositories.isUserEmployer(userId);
  }

  async isNannyRegistered(username: string) {
    return await this.repositories.isNannyRegistered(username);
  }

  async isAdminPasswordMatch(email: string, password: string) {
    const hashedPassword = await this.repositories.getOwnerPassword(email);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async isEmployerPasswordMatch(email: string, password: string) {
    const hashedPassword = await this.repositories.getEmployerPassword(email);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async isNannyPasswordMatch(username: string, password: string) {
    const hashedPassword = await this.repositories.getNannyPassword(username);
    if (hashedPassword === null) {
      return false;
    }
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async isPasswordRegistered(username: string) {
    return await this.repositories.isNannyPasswordRegistered(username);
  }

  async setNannyPassword(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return await this.repositories.setNannyPassword(username, hashedPassword);
  }

  async generateHashedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return hashedPassword;
  }

  async signUpEmployer(employer: EmployerInterface) {
    if (employer.password !== null) {
      const hashedPassword = await this.generateHashedPassword(employer.password);
      employer.password = hashedPassword;
    }
    return await this.repositories.signUpEmployer(employer);
  }

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async sendOtp(email: string) {
    const otp = this.generateOtp();

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Sending Reset Password Code",
      text: `Enter the following code when prompted: ${otp}. It will be expired in 10 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return otp;
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      transporter.close();
    }
  }

  async storeOtp(email: string, otp: number) {
    const ownerId = await this.repositories.getOwnerId(email);
    return await this.repositories.storeOtp(otp, ownerId);
  }

  async updateOtp(email: string) {
    const otp = this.generateOtp();
    const ownerId = await this.repositories.getOwnerId(email);
    return await this.repositories.updateOtp(otp, ownerId);
  }

  async validateCodeExpiration(req: any) {
    const { ownerEmail, submittedDate } = req;
    const ownerId = await this.repositories.getOwnerId(ownerEmail);
    const isValid = await this.repositories.validateCodeExpiration(
      ownerId,
      submittedDate
    );
    return isValid;
  }

  async validateCodeMatch(req: any) {
    const { code, ownerEmail } = req;
    const ownerId = await this.repositories.getOwnerId(ownerEmail);
    const isCodeMatch = await this.repositories.validateCodeMatch(
      ownerId,
      code
    );
    return isCodeMatch;
  }

  async isPasswordSame(req: any) {
    const { ownerEmail, newPassword } = req;
    const ownerId = await this.repositories.getOwnerId(ownerEmail);
    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.SALT_ROUNDS)
    );
    return await this.repositories.isPasswordSame(ownerId, hashedNewPassword);
  }

  async resetPassword(req: any) {
    const { password, ownerEmail } = req;
    const ownerId = await this.repositories.getOwnerId(ownerEmail);
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return await this.repositories.resetPassword(ownerId, hashedPassword);
  }
}

export default AutheModels;
