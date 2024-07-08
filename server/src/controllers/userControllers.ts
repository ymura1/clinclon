import UserModels from "../models/userModels";

class UserControllers {
  models: UserModels;

  constructor() {
    this.models = new UserModels();
  }

  async getUser(req: any, res: any) {
    const user = await this.models.getUser(req.params.username);
    res.send(user);
  }

  // async getUsers(req: any, res: any) {
  //   const users = await this.models.getUsers(req.params.email);
  //   res.send(users);
  // }

  async getServiceProviders(req: any, res: any) {
    const serviceProviders = await this.models.getServiceProviders(
      req.params.email
    );
    res.send(serviceProviders);
  }

  // async addUser(req: any, res: any) {
  // const response = await this.models.addUser(req.body);
  // response ? res.sendStatus(200) : res.sendStatus(400);
  // }

  async addServiceProvider(req: any, res: any) {
    const response = await this.models.addServiceProvider(req.body);
    response ? res.sendStatus(200) : res.sendStatus(400);
  }

  async editServiceProvider(req: any, res: any) {
    console.log(req)
    const response = await this.models.editServiceProvider(req.body);
    // const response = await this.models.addServiceProvider(req.body);
    // response ? res.sendStatus(200) : res.sendStatus(400);
  }

  // async isUserRegistered(req: any, res: any) {
  //   const { ownerEmail, username } = req.body;
  //   const response = await this.models.isUserRegistered(ownerEmail, username);
  //   res.send(response);
  // }

  async deleteServiceProvider(req: any, res: any) {
    const { email } = req.params;
    const response = await this.models.deleteServiceProvider(email);
    response ? res.sendStatus(200) : res.sendStatus(400);
  }

  async startRecord(req: any, res: any) {
    const response = await this.models.startRecord(req.body);
    response ? res.sendStatus(200) : res.sendStatus(400);
  }

  async endRecord(req: any, res: any) {
    const response = await this.models.endRecord(req.body);
    response ? res.sendStatus(200) : res.sendStatus(400);
  }

  async getTodaysRecord(req: any, res: any) {
    const { username } = req.params;
    const record = await this.models.getTodaysRecord(username);
    res.send(record);
  }

  async getHistory(req: any, res: any) {
    const { username } = req.params;
    const history = await this.models.getHistory(username);
    res.send(history);
  }

  async getInfoForNanny(req: any, res: any) {
    const { username } = req.params;
    const info = await this.models.getInfoForNanny(username);
    res.send(info);
  }

  async searchByPeriod(req: any, res: any) {
    const record = await this.models.searchByPeriod(req.body);
    res.send(record);
  }

  async searchByDateYear(req: any, res: any) {
    const record = await this.models.searchByDateYear(req.body);
    res.send(record);
  }

  async getRecord(req: any, res: any) {
    const { username } = req.params;
    const record = await this.models.getRecord(username);
    res.send(record);
  }
}

export default UserControllers;
