import { v4 as uuidv4 } from "uuid";
import Repositories from "./repositories";
import { ServiceProviderInterface } from "../interfaces/ServiceProviderInterface";

class UserRepositories {
  repositories: Repositories;

  constructor() {
    this.repositories = new Repositories();
  }

  // ---------------------  Owners  -------------------------------
  async getUserId(email: string) {
    const sql = "SELECT id FROM application_user WHERE email_address = $1;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].id;
  }

  async getEmployerId(email: string) {
    const sql =
      "SELECT id FROM employer WHERE EXISTS (SELECT id FROM application_user WHERE email_address = $1);";
    return (await this.repositories.queryDB(sql, [email])).rows[0].id;
  }

  async getServiceProviderId(email: string) {
    const sql =
      "SELECT id FROM service_provider WHERE EXISTS (SELECT id FROM application_user WHERE email_address = $1);";
    return (await this.repositories.queryDB(sql, [email])).rows[0].id;
  }

  // ---------------------  Users  --------------------------------
  async getUsers(ownerId: string) {
    const sql =
      "SELECT first_name, last_name, user_name, rate, rate_type, status, day, start_time, end_time FROM users u LEFT JOIN users_schedule us ON u.user_id = us.user_id WHERE u.owner_id = $1 ORDER BY update_date DESC;";
    return (await this.repositories.queryDB(sql, [ownerId])).rows;
  }

  async getServiceProviders(employerEmail: string) {
    const sql =
      "SELECT au2.first_name, au2.last_name, au2.email_address, au2.status, ep.rate, ep.rate_type, sps.day, sps.start_time, sps.end_time FROM application_user au1 INNER JOIN employer e ON au1.id = id_application_user INNER JOIN employer_provider ep ON e.id = ep.id_employer INNER JOIN service_provider sp ON sp.id = ep.id_service_provider INNER JOIN service_provider_schedule sps ON sp.id = sps.service_provider_id INNER JOIN application_user au2 ON au2.id = sp.id_application_user WHERE au1.email_address = $1;";
    return (await this.repositories.queryDB(sql, [employerEmail])).rows;
  }

  async storeServiceProviderInfo(firstName: string, lastName: string, email: string) {
    const sql = "INSERT INTO application_user VALUES (gen_random_uuid(), $1, $2, $3, $4, DEFAULT, CURRENT_TIMESTAMP) RETURNING id;";
    return (await this.repositories.queryDB(sql, [firstName, lastName, email, null])).rows[0].id;
  }

  async storeServiceProviderId(userId: string) {
    const sql = "INSERT INTO service_provider VALUES (gen_random_uuid(), $1) RETURNING id;";
    return (await this.repositories.queryDB(sql, [userId])).rows[0].id;
  }

  async storeRateInfo(rate: string, rateType: string, employerEmail: string, employerId: string, serviceProviderId: string) {
    const sql = "INSERT INTO employer_provider VALUES (gen_random_uuid(), $1, $2, $3, DEFAULT, CURRENT_TIMESTAMP, $4, $5, $6);";
    await this.repositories.queryDB(sql, [Number(rate), rateType, null, employerEmail, employerId, serviceProviderId]);
    return true;
  }

  async storeSchedule(schedules: any[], serviceProviderId: string) {
    const sql = "INSERT INTO service_provider_schedule VALUES (gen_random_uuid(), $1, $2, $3, $4);";
    const promises = schedules.map(async ({ day, start, end }) => {
      await this.repositories.queryDB(sql, [serviceProviderId, day, start, end]);
    })
    return await Promise.all(promises).then(() => {
      return true;
    })
  }

  async getUser(username: string) {
    const sql = "SELECT * FROM users WHERE user_name=$1;";
    return (await this.repositories.queryDB(sql, [username])).rows;
  }

  async addServiceProvider(
    employerEmail: string,
    firstName: string,
    lastName: string,
    email: string,
    rate: string,
    rateType: string,
    list: any,
    employerId: string
  ) {
    const applicationUserSql =
      "INSERT INTO application_user VALUES (gen_random_uuid(), $1, $2, $3, $4, DEFAULT, CURRENT_TIMESTAMP) RETURNING id;";
    const userId = (
      await this.repositories.queryDB(applicationUserSql, [
        firstName,
        lastName,
        email,
        null,
      ])
    ).rows[0].id;
    const serviceProviderSql =
      "INSERT INTO service_provider VALUES (gen_random_uuid(), $1) RETURNING id;";
    const serviceProviderId = (
      await this.repositories.queryDB(serviceProviderSql, [userId])
    ).rows[0].id;
    // save to employer_provider
    // update_by => employer Email
    // id, rate, rate_type, currency, status, update_time, update_by, id_employer, id_service_provider
    const employerProviderSql =
      "INSERT INTO employer_provider VALUES (gen_random_uuid(), $1, $2, $3, DEFAULT, CURRENT_TIMESTAMP, $4, $5, $6);";
    await this.repositories.queryDB(employerProviderSql, [
      rate,
      rateType,
      null,
      employerEmail,
      employerId,
      serviceProviderId,
    ]);
    // // save schedule
    const serviceProviderScheduleSql =
      "INSERT INTO service_provider_schedule VALUES (gen_random_uuid(), $1, $2, $3, $4);";
    await this.repositories.queryDB(serviceProviderScheduleSql, [
      serviceProviderId,
      list.day,
      list.start_time,
      list.end_time,
    ]);
    return true;
  }

  // async getUserId(username: string) {
  //   const sql = "SELECT user_id from users WHERE user_name = $1;";
  //   return (await this.repositories.queryDB(sql, [username])).rows[0].user_id;
  // }

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

  // async deleteUser(ownerId: string, userId: string) {
  //   const deleteUserSql =
  //     "DELETE FROM users WHERE owner_id = $1 AND user_id = $2;";
  //   await this.repositories.queryDB(deleteUserSql, [ownerId, userId]);
  //   return true;
  // }

  async deleteUserInfo(email: string) {
    const sql = "DELETE FROM application_user WHERE email_address = $1 RETURNING id;";
    return (await this.repositories.queryDB(sql, [email])).rows[0].id;
  }

  async deleteServiceProviderId(userId: string) {
    const sql = "DELETE FROM service_provider WHERE id_application_user = $1 RETURNING;";
    return await this.repositories.queryDB(sql, [userId]);
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
