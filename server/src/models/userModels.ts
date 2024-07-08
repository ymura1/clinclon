import UserRepositories from "../repositories/userRepositories";
import { ServiceProviderInterface } from "../interfaces/ServiceProviderInterface";
import dotenv from "dotenv";
dotenv.config();

class UserModels {
  repositories: UserRepositories;

  constructor() {
    this.repositories = new UserRepositories();
  }

  async getEmployerId(email: string) {
    return await this.repositories.getEmployerId(email);
  }

  async getServiceProviderId(email: string) {
    return await this.repositories.getServiceProviderId(email);
  }

  async getServiceProviders(employerEmail: string) {
    const employerId = await this.repositories.getEmployerId(employerEmail);
    return await this.repositories.getServiceProviders(employerId);
  }

  async getUser(username: string) {
    return await this.repositories.getUser(username);
  }

  async addServiceProvider(req: any) {
    const {
      firstName,
      lastName,
      serviceProviderEmail,
      employerEmail,
      rate,
      rateType,
      lists,
    } = req;
    const userId = await this.repositories.addServiceProviderInfo(firstName, lastName, serviceProviderEmail);
    const employerId = await this.repositories.getEmployerId(employerEmail);
    const transactionId = await this.repositories.addRateInfo(rate, rateType, employerEmail, employerId, userId);
    return await this.repositories.addSchedule(userId, transactionId, lists);
  }

  async editServiceProvider(req: any) {
    // Frances wants to change
    const { email_address, updatedFirstName, updatedLastName, updatedEmail, updatedStatus } = req;
    // update users table
    const userId = await this.repositories.getUserId(email_address);
    await this.repositories.updateServiceProviderInfo(updatedFirstName, updatedLastName, updatedEmail, updatedStatus);
    // update user_transaction table
    // update user_schedule table
  }

// Frances => Andria
// Frances => Amit
// Yui => Andria
// Amit => Yui


// User
// 	1. Frances
// 	2. Andria
// 	3. Yui
// 	4. Amit

// User_transaction
// 	id: 1, rate: 20, sp_id: 2, ep_id: 1
// 	id: 2, rate: 10, sp_id: 4, ep_id: 1
// 	id: 3, rate: 20, sp_id: 2, ep_id: 3
// 	id: 4, rate: 25, sp_id: 3, ep_id: 4

// User_schedule
// 	id: 1, sp_id: 2, ut_id: 1, day: Mon, start_time: 9:00AM, end_time: 5:00PM

  async editUser(req: any) {
    const userId = await this.repositories.getUserId(req.user_name);
    await this.repositories.editUser(req, userId);
    const schedule = await this.repositories.getScheduleByUserId(userId);
    return req.finalShifts.map(
      async (s: { day: string; start_time: string; end_time: number }) => {
        await this.repositories.editSchedule(userId, s);
        // const isMatch = schedule.some((d: any) => d.day === s.day);
        // if (isMatch) {
        //   await this.repositories.editSchedule(userId, s);
        // }
      }
    );
  }

  // async isUserRegistered(ownerEmail: string, username: string) {
  //   const ownerId = await this.getOwnerId(ownerEmail);
  //   return await this.repositories.isUserRegistered(ownerId, username);
  // }

  async deleteServiceProvider(email: string) {
    return false;
    /**
     * delete from application_user
     * delete from service_provider
     * delete from employer_provider
     * delete from service_provider_schedule
     */
    // const ownerId = await this.getOwnerId(ownerEmail);
    // const userId = await this.repositories.getUserId(username);
    // await this.repositories.deleteSchedule(userId);
    // return await this.repositories.deleteUser(ownerId, userId);
  }

  async startRecord(req: any) {
    const { username, checkedInTime } = req;
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.startRecord(userId, checkedInTime);
  }

  async endRecord(req: any) {
    const { username, checkedOutTime } = req;
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.endRecord(userId, checkedOutTime);
  }

  async getTodaysRecord(username: string) {
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.getTodaysRecord(userId);
  }

  async getHistory(username: string) {
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.getHistory(userId);
  }

  async getInfoForNanny(username: string) {
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.getInfoForNanny(userId);
  }

  async searchByPeriod(req: any) {
    const { from, to, username } = req;
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.searchByPeriod(from, to, userId);
  }

  async searchByDateYear(req: any) {
    const { year, month, username } = req;
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.searchByDateYear(year, month, userId);
  }

  async getRecord(username: string) {
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1).toString();
    const userId = await this.repositories.getUserId(username);
    return await this.repositories.searchByDateYear(
      currentYear,
      currentMonth,
      userId
    );
  }
}

export default UserModels;
