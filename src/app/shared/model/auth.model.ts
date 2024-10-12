import { User } from "./user.model";

export interface LoginUserRequest {
  identifier: string;
  password: string;
}

export interface RegisterUserRequest {
  noPegawai?: string;
  nik: string;
  email: string;
  name: string;
  password: string;
  dinas?: string;
}

export interface ResetPassword {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthResponse {
  code: number;
  status: string;
  data?: User;
  errors: any;
}
