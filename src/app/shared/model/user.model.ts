export interface CreateUserRequest {
  participantId: string;
  idNumber?: string;
  nik?: string;
  email: string;
  name: string;
  password: string;
  dinas?: string;
  roleId: string;
}

export interface UpdateUserRequest {
  idNumber?: string;
  nik?: string;
  email?: string;
  name?: string;
  password?: string;
  dinas?: string;
  roleId?: string;
}

export interface User {
  id: string;
  participantId?: string;
  idNumber?: string;
  nik: string;
  email: string;
  name: string;
  dinas?: string;
  roleId: string;
  role: {
    id: string,
    name: string,
  },
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

export interface UserResponse {
  code: number;
  status: string;
  data: User | User[];
  actions: ActionAccessRigts,
  paging: Paging;
}
