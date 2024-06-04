import { v4 as uuidv4 } from "uuid";
import Repositories from "./repositories";

class UserRepositories {
  repositories: Repositories;

  constructor() {
    this.repositories = new Repositories();
  }

  // ---------------------  Owners  --------------------------------
  async getOwnerId(email: string) {
    const sql = "SELECT owner_id FROM owners WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].owner_id;
  }

  // ---------------------  Users  --------------------------------
  async getUsers(ownerId: string) {
    const sql =
      "SELECT first_name, last_name, user_name, rate, rate_type, status, day, start_time, end_time FROM users u LEFT JOIN users_schedule us ON u.user_id = us.user_id WHERE u.owner_id = $1 ORDER BY update_date DESC;";
    return (await this.repositories.queryDB(sql, [ownerId])).rows;
  }

  async getUser(username: string) {
    const sql = "SELECT * FROM users WHERE user_name=$1;";
    return (await this.repositories.queryDB(sql, [username])).rows;
  }

  async getUserId(username: string) {
    const sql = "SELECT user_id from users WHERE user_name = $1;";
    return (await this.repositories.queryDB(sql, [username])).rows[0].user_id;
  }

  async getInfoForNanny(userId: string) {
    const sql =
      "SELECT rate, rate_type, day, start_time, end_time FROM users u INNER join users_schedule us ON u.user_id = us.user_id where u.user_id = $1;";
    return (await this.repositories.queryDB(sql, [userId])).rows;
  }

  async addUser(user: any, ownerId: string) {
    const { username, rate, rateType, ownerEmail } = user;
    const sql =
      "INSERT INTO users VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id;";
    return (
      await this.repositories.queryDB(sql, [
        ownerId,
        null,
        null,
        username,
        rate,
        rateType,
        "active",
        new Date(),
        ownerEmail,
      ])
    ).rows[0].user_id;
  }

  async editUser(req: any, userId: string) {
    const { updatedUsername, updatedRate, updatedRateType, updatedStatus } =
      req;
    const sql =
      "UPDATE users SET first_name=$1, last_name=$2, user_name=$3, rate=$4, rate_type=$5, status=$6, update_date=$7 WHERE user_id=$8;";
    await this.repositories.queryDB(sql, [
      null,
      null,
      updatedUsername,
      updatedRate,
      updatedRateType,
      updatedStatus,
      new Date(),
      userId,
    ]);
    return true;
  }

  async deleteUser(ownerId: string, userId: string) {
    const deleteUserSql =
      "DELETE FROM users WHERE owner_id = $1 AND user_id = $2;";
    await this.repositories.queryDB(deleteUserSql, [ownerId, userId]);
    return true;
  }

  async isUserRegistered(ownerId: string, username: string) {
    const sql = "SELECT * FROM users WHERE owner_id = $1 AND user_name = $2;";
    return (
      (await this.repositories.queryDB(sql, [ownerId, username])).rowCount > 0
    );
  }

  // ---------------------  Schedule  --------------------------------
  async getScheduleByUserId(userId: string) {
    const sql =
      "SELECT day, start_time, end_time FROM public.users_schedule WHERE user_id=$1;";
    return (await this.repositories.queryDB(sql, [userId])).rows;
  }

  async addSchedule(userId: string, schedules: []) {
    const sql = "INSERT INTO users_schedule VALUES ($1, $2, $3, $4, $5);";
    const premises = schedules.map(async ({ day, start, end }) => {
      await this.repositories.queryDB(sql, [uuidv4(), userId, day, start, end]);
    });
    return await Promise.all(premises).then(() => {
      return true;
    });
  }

  async editSchedule(userId: string, shift: any) {
    const { day, start_time, end_time } = shift;
    const sql =
      "INSERT INTO users_schedule VALUES (uuid_generate_v4(), $1, $2, $3, $4) ON CONFLICT (user_id, day) DO UPDATE SET start_time = $5, end_time = $6;";
    await this.repositories.queryDB(sql, [
      userId,
      day,
      start_time,
      end_time,
      start_time,
      end_time,
    ]);
    return true;
  }

  async deleteSchedule(userId: string) {
    const sql = "DELETE FROM users_schedule WHERE user_id = $1;";
    await this.repositories.queryDB(sql, [userId]);
    return true;
  }

  // ---------------------  Record  --------------------------------
  async startRecord(userId: string, checkedInTime: string) {
    const sql =
      "INSERT INTO time_record_v2 VALUES (gen_random_uuid(), $1, $2, $3, CURRENT_DATE, $4)";
    await this.repositories.queryDB(sql, [userId, checkedInTime, null, userId]);
    return true;
  }

  async endRecord(userId: string, checkedOutTime: string) {
    const sql =
      "SELECT time_record_id FROM time_record_v2 WHERE user_id = $1 AND start_time::DATE = CURRENT_DATE;";
    const sql2 =
      "UPDATE time_record_v2 SET end_time = $1, update_by = $2, update_date = CURRENT_TIMESTAMP WHERE time_record_id = $3;";
    const id = (await this.repositories.queryDB(sql, [userId])).rows[0]
      .time_record_id;
    await this.repositories.queryDB(sql2, [checkedOutTime, userId, id]);
    return true;
  }

  async getTodaysRecord(userId: string) {
    const sql =
      "SELECT start_time, end_time FROM time_record_v2 WHERE user_id = $1 AND (start_time::DATE = CURRENT_DATE OR end_time::DATE = CURRENT_DATE);";
    return (await this.repositories.queryDB(sql, [userId])).rows;
  }

  async getHistory(userId: string) {
    const sql =
      "SELECT record_date, record_time FROM time_record WHERE user_id = $1;";
    return (await this.repositories.queryDB(sql, [userId])).rows;
  }

  async searchByPeriod(from: string, to: string, userId: string) {
    const sql =
      "SELECT start_time, end_time FROM time_record_v2 WHERE user_id = $1 AND start_time::DATE >= $2 AND start_time::DATE <= $3;";
    return (await this.repositories.queryDB(sql, [userId, from, to])).rows;
  }

  async searchByDateYear(year: string, month: string, userId: string) {
    const sql =
      "SELECT start_time, end_time FROM time_record_v2 WHERE date_part('year', start_time) = $1 AND date_part('month', start_time) = $2 AND user_id = $3;";
    const data = (await this.repositories.queryDB(sql, [year, month, userId]))
      .rows;
    return data;
  }
}

export default UserRepositories;
