import { Capability } from "./capability.model";

export interface CreateCOT {
  kodeCot: string;
  capabilityId: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasiTraining: string;
  instrukturTeoriRegulasiGse: string;
  instrukturTeoriKompetensi: string;
  instrukturPraktek1: string;
  instrukturPraktek2: string;
  status?: boolean;
}

export interface UpdateCOT {
  id: string;
  kodeCot?: string;
  capabilityId?: string;
  tanggalMulai?: string;
  tanggalSelesai?: string;
  lokasiTraining?: string;
  instrukturTeoriRegulasiGse?: string;
  instrukturTeoriKompetensi?: string;
  instrukturPraktek1?: string;
  instrukturPraktek2?: string;
  status?: boolean;
}

export interface COT {
  id: string;
  kodeCot: string;
  capabilityId: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasiTraining: string;
  instrukturTeoriRegulasiGse: string;
  instrukturTeoriKompetensi: string;
  instrukturPraktek1: string;
  instrukturPraktek2: string;
  status: boolean;
  Capability: Capability;
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
