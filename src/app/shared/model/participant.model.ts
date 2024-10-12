export interface Participant {
  id: string;
  noPegawai?: string;
  nama: string;
  nik: string;
  dinas?: string;
  bidang?: string;
  perusahaan: string;
  email: string;
  noTelp: string;
  negara: string;
  tempatLahir: string;
  tanggalLahir: string;
  simA: File | null;
  simB: File | null;
  ktp: File | null;
  foto: File | null;
  suratSehatButaWarna: File | null;
  expSuratSehatButaWarna: string;
  suratBebasNarkoba: File | null;
  expSuratBebasNarkoba: string;
  linkQrCode?: string;
  qrCode?: string | File;
  gmfNonGmf?: string;
}

export interface UpdateParticipant {
  noPegawai?: string | null;
  nama: string;
  nik: string;
  dinas?: string | null;
  bidang?: string | null;
  perusahaan: string;
  email: string;
  noTelp: string;
  negara: string;
  tempatLahir: string;
  tanggalLahir: string;
  simA: File | null;
  simAFileName?: string;
  simB: File | null;
  simBFileName?: string;
  ktp: File | null;
  ktpFileName?: string;
  foto: File | null;
  fotoFileName?: string;
  suratSehatButaWarna: File | null;
  suratSehatButaWarnaFileName?: string;
  suratBebasNarkoba: File |null;
  suratBebasNarkobaFileName?: string;
  expSuratSehatButaWarna: string;
  expSuratBebasNarkoba: string;
}

export interface CreateParticipant {
  noPegawai?: string | null;
  nama: string;
  nik: string;
  dinas?: string | null;
  bidang?: string | null;
  perusahaan: string;
  email: string;
  noTelp: string;
  negara: string;
  tempatLahir: string;
  tanggalLahir: string;
  simA: File | null;
  simAFileName?: string;
  simB: File | null;
  simBFileName?: string;
  ktp: File | null;
  ktpFileName?: string;
  foto: File | null;
  fotoFileName?: string;
  suratSehatButaWarna: File | null;
  suratSehatButaWarnaFileName?: string;
  suratBebasNarkoba: File | null;
  suratBebasNarkobaFileName: string;
  expSuratSehatButaWarna: string;
  expSuratBebasNarkoba: string;
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
