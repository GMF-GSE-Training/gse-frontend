export interface RegisterUserRequest {
  no_pegawai?: string;
  nik: string;
  email: string;
  name: string;
  password: string;
  dinas?: string;
}

export interface CreateUserRequest {
  no_pegawai?: string;
  nik?: string;
  email: string;
  name: string;
  password: string;
  dinas?: string;
  roleId: string;
}

export interface UpdateUserRequest {
  no_pegawai?: string;
  nik?: string;
  email?: string;
  name?: string;
  password?: string;
  dinas?: string;
  roleId?: string;
}

export interface User {
  id: string;
  no_pegawai?: string;
  nik: string;
  email: string;
  name: string;
  dinas?: string;
  roleId: string;
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
  data?: User;
  errors: any;
}
