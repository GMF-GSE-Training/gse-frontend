export class LoginUserRequest {
  identifier: string;
  password: string;

  constructor() {
    this.identifier = '';
    this.password = '';
  }
}

export interface UserResponse {
  id: number;
  no_pegawai?: string;
  nik?: string;
  email: string;
  name: string;
  dinasId?: number;
  roleId: number;
  token?: string;
}
