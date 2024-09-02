export interface Participant {
  id: string;
  no_pegawai: string;
  nama: string;
  dinas: string;
  bidang: string;
  perusahaan: string;
  email: string;
  no_telp: string;
  negara: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  sim_a: string;
  sim_b: string;
  ktp: string;
  foto: string;
  surat_sehat_buta_warna: string;
  exp_surat_sehat: string;
  surat_bebas_narkoba: string;
  exp_bebas_narkoba: string;
  gmf_nongmf: string;
  link_qr_code: string;
  qr_code: string;
  link: {
    self: string;
    update: string;
    delete: string;
  };
  editLink?: string;
  detailLink?: string;
  delete?: () => any;
}

export interface Paging {
  current_page: number;
  total_page: number;
  size: number;
  links: {
    next: string | null;
    prev: string | null;
  };
}

export interface ApiResponse {
  code: number;
  status: string;
  data: Participant[];
  paging: Paging;
}
