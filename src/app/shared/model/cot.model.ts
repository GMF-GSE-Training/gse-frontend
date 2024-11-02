export interface CreateCOT {
  kodeCot: string;
  capabilityId: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  lokasiTraining: string;
  instrukturTeoriRegulasiGse: string;
  instrukturTeoriKompetensi: string;
  instrukturPraktek1: string;
  instrukturPraktek2: string;
  status?: boolean;
}

export interface COT {
  kodeCot: string;
  capabilityId: string;
  tanggalMulai: Date;
  tanggalSelesai: Date;
  lokasiTraining: string;
  instrukturTeoriRegulasiGse: string;
  instrukturTeoriKompetensi: string;
  instrukturPraktek1: string;
  instrukturPraktek2: string;
  status: boolean;
  capability?: Object;
}

export interface CotResponse {
  code: number;
  status: string;
  data: COT | string | COT[];
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
