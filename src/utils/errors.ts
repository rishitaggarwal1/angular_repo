import { ErrorModel } from "src/Models/error-model";

export const LoginRequiredError = new ErrorModel("Login is required to access these functionality", 0);
export const LoginExpiredError = new ErrorModel("Token is invalid/ expired", 1);

export const ALL_ERRORS = [
    LoginRequiredError,
    LoginExpiredError,
]