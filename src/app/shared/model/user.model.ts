export interface CreateUserRequest {
  noPegawai?: string;
  nik?: string;
  email: string;
  name: string;
  password: string;
  dinas?: string;
  roleId: string;
}

export interface UpdateUserRequest {
  noPegawai?: string;
  nik?: string;
  email?: string;
  name?: string;
  password?: string;
  dinas?: string;
  roleId?: string;
}

export interface User {
  id: string;
  noPegawai?: string;
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
  currentPage: number;
  totalPage: number;
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
