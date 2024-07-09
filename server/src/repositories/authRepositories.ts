import { EmployerInterface } from "../interfaces/EmployerInterface";
import Repositories from "./repositories";

class AuthRepositories {
  repositories: Repositories;

  constructor() {
    this.repositories = new Repositories();
  }

  async signUp(req: any, hashedPass: string) {
    const { firstName, lastName, email } = req;
    const sql =
      "INSERT INTO users VALUES (gen_random_uuid(), $1, $2, $3, $4, DEFAULT, CURRENT_TIMESTAMP);";
    await this.repositories.queryDB(sql, [
      firstName,
      lastName,
      email,
      hashedPass,
    ]);
    return true;
  }

  async getName(email: string) {
    const sql = "SELECT first_name, last_name FROM users WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows;
  }

  async getPassword(email: string) {
    const sql = "SELECT password FROM users WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].password;
  }

  async isUserRegistered(email: string) {
    const sql = "SELECT * FROM users WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rowCount > 0;
  }

  async getUserId(email: string) {
    const sql = "SELECT user_id FROM users WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].user_id;
  }

  async storeOtp(otp: string, userId: string) {
    const sql =
      "INSERT INTO otp VALUES (gen_random_uuid(), $1, $2, CURRENT_TIMESTAMP);";
    await this.repositories.queryDB(sql, [userId, otp]);
    return true;
  }

  async updateOtp(otp: number, ownerId: string) {
    const sql =
      "UPDATE otps SET otp = $1 AND create_date = CURRENT_TIMESTAMP WHERE owner_id = $2;";
    const data = await this.repositories.queryDB(sql, [otp, ownerId]);
    return true;
  }

  async validateCodeExpiration(ownerId: string, submittedDate: Date) {
    const sql =
      "SELECT COUNT (*) FROM owners WHERE owner_id = $1 AND create_date + INTERVAL '10 Minutes' >= $2;";
    return (
      (await this.repositories.queryDB(sql, [ownerId, submittedDate]))
        .rowCount > 0
    );
  }

  async validateCodeMatch(ownerId: string, code: string) {
    const sql =
      "SELECT COUNT (*) FROM reset_password_code WHERE owner_id = $1 AND reset_password_code = $2;";
    return (await this.repositories.queryDB(sql, [ownerId, code])).rowCount > 0;
  }

  async resetPassword(ownerId: string, newPassword: string) {
    const sql = "UPDATE owners SET owner_password = $1 WHERE owner_id = $2;";
    await this.repositories.queryDB(sql, [newPassword, ownerId]);
    return true;
  }
}

export default AuthRepositories;
