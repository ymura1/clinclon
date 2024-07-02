import AuthControllers from "../controllers/authControllers";
import UserControllers from "../controllers/userControllers";

class Routes {
    authControllers: AuthControllers;
    userControllers: UserControllers;

    constructor() {
        this.authControllers = new AuthControllers();
        this.userControllers = new UserControllers();
    }

    applyRouting(app: any) {
        // auth routes
        app.post('/signUp_nanny', this.authControllers.signUpNanny.bind(this.authControllers));
        app.post('/signUp_employer', this.authControllers.signUpEmployer.bind(this.authControllers));
        app.post('/signIn_employer', this.authControllers.signInEmployer.bind(this.authControllers));
        app.post('/signIn_nanny', this.authControllers.signInNanny.bind(this.authControllers));
        // app.post('/user/reset', this.authControllers.sendOtp.bind(this.authControllers));
        app.post('/user/code', this.authControllers.validateCode.bind(this.authControllers));
        app.post('/user/validate/password', this.authControllers.validatePassword.bind(this.authControllers));
        app.post('/reset/password', this.authControllers.resetPassword.bind(this.authControllers));
        app.post('/otp/resend', this.authControllers.resendOTP.bind(this.authControllers));

        // user routes
        app.get('/getServiceProviders/:email', this.userControllers.getServiceProviders.bind(this.userControllers));
        // app.get('/users/:email', this.userControllers.getUsers.bind(this.userControllers));
        app.get('/user/:username', this.userControllers.getUser.bind(this.userControllers));
        app.get('/history/:username', this.userControllers.getHistory.bind(this.userControllers));
        // app.post('/user', this.userControllers.addUser.bind(this.userControllers));
        app.post('/addServiceProvider', this.userControllers.addServiceProvider.bind(this.userControllers));
        // app.post('/edit/user', this.userControllers.editUser.bind(this.userControllers));
        // app.post('/user/duplicate', this.userControllers.isUserRegistered.bind(this.userControllers));
        app.delete('/user/:email', this.userControllers.deleteServiceProvider.bind(this.userControllers));
        app.post('/startRecord', this.userControllers.startRecord.bind(this.userControllers));
        app.post('/endRecord', this.userControllers.endRecord.bind(this.userControllers));
        app.get('/getTodaysRecord/:username', this.userControllers.getTodaysRecord.bind(this.userControllers));
        app.get('/getUserInfo/:username', this.userControllers.getInfoForNanny.bind(this.userControllers));
        app.post('/searchByPeriod', this.userControllers.searchByPeriod.bind(this.userControllers));
        app.post('/searchByDateYear', this.userControllers.searchByDateYear.bind(this.userControllers));
        app.get('/getRecord/:username', this.userControllers.getRecord.bind(this.userControllers));
    }
}

export default Routes;