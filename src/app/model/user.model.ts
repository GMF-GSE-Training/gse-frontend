export class RegisterUserRequest {
  no_pegawai: string;
  nik: string;
  email: string;
  name: string;
  password: string;
  dinas: string;

  constructor(){
    this.no_pegawai = '';
    this.nik = '';
    this.email = '';
    this.name = '';
    this.password = '';
    this.dinas = '';
  }
}

export interface UserResponse {
  id: number;
  no_pegawai?: string;
  nik?: string;
  email: string;
  name: string;
  dinas?: string;
  roleId: number;
  token?: string;
}
