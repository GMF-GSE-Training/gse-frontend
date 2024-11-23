export interface CreateESign {
  idNumber: string;
  role: string;
  name: string;
  eSign: Buffer;
  signFileName?: string;
  status: boolean;
}

export interface UpdateESign {
  idNumber?: string;
  role?: string;
  name?: string;
  eSign?: File;
  signFileName?: string;
  status?: boolean;
}

export interface ESign {
  id: string;
  idNumber: string;
  role: string;
  name: string;
  eSign: File;
  signFileName: string;
  status: boolean;
}

export interface ESignResponse {
  code: number;
  status: string;
  data: string | ESign | ESign[];
  actions?: ActionAccessRigts,
  paging?: Paging;
}

type ActionAccessRigts = {
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
}

type Paging = {
  currentPage: number;
  totalPage: number;
  size: number;
}
