export interface IError {
  errors: {
    [key: string]: string[];
  };
}

export interface ISignupError extends IError {
  signupStatus: boolean;
}

export interface ISigninError extends IError {
  signinStatus: boolean;
}

export interface IPostError extends IError {
  postStatus: boolean;
}
