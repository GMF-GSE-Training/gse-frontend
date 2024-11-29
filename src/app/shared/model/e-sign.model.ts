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
  id: string;
  idNumber: string;
  role: string;
  name: string;
  eSign: File;
  signFileName: string;
  status: boolean;
}
