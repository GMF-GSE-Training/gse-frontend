export interface Role {
  id: string;
  name: string;
}

export interface RoleResponse {
  code: number;
  status: string;
  data: Role[];
}
