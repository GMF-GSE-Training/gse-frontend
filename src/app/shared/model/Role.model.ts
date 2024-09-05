export interface Role {
  id: string;
  role: string;
}

export interface RoleResponse {
  code: number;
  status: string;
  data: Role[];
}
