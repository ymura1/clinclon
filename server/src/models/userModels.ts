import UserRepositories from "../repositories/userRepositories";
import { ServiceProviderInterface } from "../interfaces/ServiceProviderInterface";
import dotenv from "dotenv";
dotenv.config();

class UserModels {
  repositories: UserRepositories;

  constructor() {
    this.repositories = new UserRepositories();
  }

  // async getOwnerId(email: string) {
  //   return await this.repositories.getOwnerId(email);
  // }

  async getEmployerId(email: string) {
    return await this.repositories.getEmployerId(email);
  }

  async getServiceProviderId(email: string) {
    return await this.repositories.getServiceProviderId(email);
  }

  async getServiceProviders(employerEmail: string) {
    return await this.repositories.getServiceProviders(employerEmail);
  }

  async getUser(username: string) {
    return await this.repositories.getUser(username);
  }

  async addServiceProvider(req: any) {
    const {
      employerEmail,
      serviceProviderEmail,
      firstName,
      lastName,
      rate,
      rateType,
      lists,
    } = req;
    const employerId = await this.repositories.getEmployerId(employerEmail);
    return await this.repositories.addServiceProvider(
      employerEmail,
      firstName,
      lastName,
      serviceProviderEmail,
      rate,
      rateType,
      lists,
      employerId
    );
  }

  async addSchedule(userId: string, user: []) {
    return await this.repositories.addSchedule(userId, user);
  }

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

  // async deleteUser(ownerEmail: string, username: string) {
  //   const ownerId = await this.getOwnerId(ownerEmail);
  //   const userId = await this.repositories.getUserId(username);
  //   await this.repositories.deleteSchedule(userId);
  //   return await this.repositories.deleteUser(ownerId, userId);
  // }

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
