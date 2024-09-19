export interface Participant {
  id: string;
  no_pegawai?: string;
  nama: string;
  nik: string;
  dinas?: string;
  bidang?: string;
  perusahaan: string;
  email: string;
  no_telp: string;
  negara: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  sim_a: File | string | null;
  sim_b: File | string | null;
  ktp: File | string | null;
  foto: File | string | null;
  surat_sehat_buta_warna: File | string | null;
  exp_surat_sehat: string;
  surat_bebas_narkoba: File | string | null;
  exp_bebas_narkoba: string;
  link_qr_code?: string;
  qr_code?: string | File;
  gmf_non_gmf?: string;
}

export interface UpdateParticipant {
  no_pegawai?: string | null;
  nama: string;
  nik: string;
  dinas?: string | null;
  bidang?: string | null;
  perusahaan: string;
  email: string;
  no_telp: string;
  negara: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  sim_a: File | string | null;
  sim_b: File | string | null;
  ktp: File | string | null;
  foto: File | string | null;
  surat_sehat_buta_warna: File | string | null;
  surat_bebas_narkoba: File | string |null;
  exp_surat_sehat: string;
  exp_bebas_narkoba: string;
}

export interface CreateParticipant {
  no_pegawai?: string | null;
  nama: string;
  nik: string;
  dinas?: string | null;
  bidang?: string | null;
  perusahaan: string;
  email: string;
  no_telp: string;
  negara: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  sim_a: File | null;
  sim_b: File | null;
  ktp: File | null;
  foto: File | null;
  surat_sehat_buta_warna: File | null;
  surat_bebas_narkoba: File | null;
  exp_surat_sehat: string;
  exp_bebas_narkoba: string;
  link_qr_code: string;
  gmf_non_gmf?: string;
}

type ActionAccessRigts = {
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
}

type Paging = {
  current_page: number;
  total_page: number;
  size: number;
}

export interface ListParticipantsResponse {
  code: number;
  status: string;
  data: Participant[],
  actions: ActionAccessRigts,
  paging: Paging;
}

export interface ParticipantResponse {
  code: number;
  status: string;
  data: Participant;
}

export interface DeleteParticipant {
  code: number;
  status: string;
  data: boolean;
}

export interface FileResponse {
  code: number;
  status: string;
  data: string;
}
