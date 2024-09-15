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

type Paging = {
  current_page: number;
  total_page: number;
  size: number;
}

type ActionAccessRigts = {
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
}

export interface ListUserResponse {
  code: number;
  status: string;
  data: User[];
  actions: ActionAccessRigts,
  paging: Paging;
}

export interface UserResponse {
  code: number;
  status: string;
  data?: User;
  errors: any;
}
