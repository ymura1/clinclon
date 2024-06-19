import { EmployerInterface } from "../interfaces/EmployerInterface";
import Repositories from "./repositories";

class AuthRepositories {
  repositories: Repositories;

  constructor() {
    this.repositories = new Repositories();
  }

  async isUserRegistered(email: string) {
    const sql = "SELECT * FROM application_user WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rowCount > 0;
  }

  async isUserEmployer(id: string) {
    const sql = "SELECT * FROM employer WHERE id_application_user = $1;";
    return (await this.repositories.queryDB(sql, [id])).rowCount > 0;
  }

  async isUserProvider(id: string) {
    const sql =
      "SELECT * FROM service_provider WHERE id_application_user = $1;";
    return (await this.repositories.queryDB(sql, [id])).rowCount > 0;
  }

  async getUserId(email: string) {
    const sql = "SELECT id FROM application_user WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].id;
  }

  async isOwnerRegistered(email: string) {
    const sql = "SELECT * FROM owners WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rowCount > 0;
  }

  async isNannyRegistered(username: string) {
    const sql = "SELECT COUNT (*) FROM users WHERE user_name = $1;";
    return (await this.repositories.queryDB(sql, [username])).rows[0].count > 0;
  }

  async isNannyPasswordRegistered(username: string) {
    const sql = "SELECT user_password FROM users WHERE user_name = $1;";
    const data = (await this.repositories.queryDB(sql, [username])).rows[0]
      .user_password;
    return data !== null;
  }

  async setNannyPassword(username: string, password: string) {
    const sql = "UPDATE users SET user_password = $1 WHERE user_name = $2;";
    await this.repositories.queryDB(sql, [password, username]);
    return true;
  }

  async signUpEmployer(employer: EmployerInterface) {
    const {firstName, lastName, email, password } = employer;
    const sqlApplicationUuser =
      "INSERT INTO application_user VALUES (gen_random_uuid(), $1, $2, $3, $4, DEFAULT, CURRENT_TIMESTAMP) RETURNING id;";
    const id = (await this.repositories.queryDB(sqlApplicationUuser, [firstName, lastName, email, password])).rows[0].id;
    const sqlEmployer = "INSERT INTO employer VALUES (gen_random_uuid(), $1);";
    await this.repositories.queryDB(sqlEmployer, [id]);
    return true;
  }

  async registerOwner(owner: any) {
    const { email, status, createDate, password } = owner;
    const sql =
      "INSERT INTO owners VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6);";
    return (
      (
        await this.repositories.queryDB(sql, [
          null,
          null,
          email,
          password,
          status,
          createDate,
        ])
      ).rowCount > 0
    );
  }

  async getEmployerPassword(email: string) {
    const sql =
      "SELECT password FROM application_user WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].password;
  }

  async getOwnerPassword(email: string) {
    const sql = "SELECT owner_password FROM owners WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0]
      .owner_password;
  }

  async getNannyPassword(username: string) {
    const sql = "SELECT user_password FROM users WHERE user_name = $1;";
    return (await this.repositories.queryDB(sql, [username])).rows[0]
      .user_password;
  }

  async storeOtp(otp: number, ownerId: string) {
    const sql =
      "INSERT INTO otps VALUES (gen_random_uuid(), $1, $2, CURRENT_TIMESTAMP);";
    const data = await this.repositories.queryDB(sql, [ownerId, otp]);
    return true;
  }

  async updateOtp(otp: number, ownerId: string) {
    const sql =
      "UPDATE otps SET otp = $1 AND create_date = CURRENT_TIMESTAMP WHERE owner_id = $2;";
    const data = await this.repositories.queryDB(sql, [otp, ownerId]);
    return true;
  }

  async getOwnerId(email: string) {
    const sql = "SELECT owner_id FROM owners WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].owner_id;
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

  async isPasswordSame(ownerId: string, password: string) {
    const sql =
      "SELECT COUNT (*) FROM owners WHERE owner_id = $1 AND owner_password = $2;";
    return (
      (await this.repositories.queryDB(sql, [ownerId, password])).rowCount > 0
    );
  }

  async resetPassword(ownerId: string, newPassword: string) {
    const sql = "UPDATE owners SET owner_password = $1 WHERE owner_id = $2;";
    await this.repositories.queryDB(sql, [newPassword, ownerId]);
    return true;
  }
}

export default AuthRepositories;
