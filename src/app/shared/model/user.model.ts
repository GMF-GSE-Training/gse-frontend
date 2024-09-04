export class RegisterUserRequest {
  no_pegawai?: string;
  nik: string;
  email: string;
  name: string;
  password: string;
  dinas?: string;

  constructor(){
    this.no_pegawai = '';
    this.nik = '';
    this.email = '';
    this.name = '';
    this.password = '';
    this.dinas = '';
  }
}

export interface User {
  id: string;
  no_pegawai?: string;
  nik: string;
  email: string;
  name: string;
  dinas?: string;
  roleId: number;
  role: {
    id: string,
    role: string,
  },
  roleName: string;
}

export interface Paging {
  current_page: number;
  total_page: number;
  size: number;
  links: {
    next: string | null;
    prev: string | null;
  };
}

export interface ListUserResponse {
  code: number;
  status: string;
  data: User[];
  paging: Paging;
}

export interface UserResponse {
  code: number;
  status: string;
  data: User[];
  paging?: Paging;
}
