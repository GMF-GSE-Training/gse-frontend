export interface CreateCapability {
  kodeRating: string;
  kodeTraining: string;
  namaTraining: string;
}

export interface CapabilityResponse {
  code: number;
  status: string;
  data: {
    id: string;
    kodeRating: string;
    kodeTraining: string;
    namaTraining: string;
    totalDurasiTeoriRegGse?: string;
    totalDurasiPraktekRegGse?: string;
    totalDurasiTeoriKompetensi?: string;
    totalDurasiPraktekKompetensi?: string;
    TotalDurasi?: string;
    curriculumSyllabus?: CurriculumSyllabus[];
  }
}

export interface CapabilityListResponse {
  code: number;
  status: string;
  data: CapabilityResponse[],
  actions: ActionAccessRigts,
  paging: Paging;
}

type CurriculumSyllabus = {
  capabilityId: string;
  nama: string;
  durasiTeori: number;
  durasiPraktek: number;
  type: string;
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
