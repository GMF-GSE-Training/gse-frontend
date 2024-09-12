export interface LoginUserRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  no_pegawai?: string;
  nik?: string;
  email: string;
  name: string;
  dinasId?: number;
  roleId: number;
  token?: string;
}
