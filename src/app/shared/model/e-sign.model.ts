export interface CreateESign {
  noPegawai: string;
  role: string;
  name: string;
  eSign: File;
  eSignFileName?: string;
  status: boolean;
}

export interface ESign {
  id: string;
  noPegawai: string;
  role: string;
  name: string;
  eSign: File;
  eSignFileName: string;
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
