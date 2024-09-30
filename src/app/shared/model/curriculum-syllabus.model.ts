export interface RegulationGSE {
  reg_gse: string;
  durasi_teori: number;
  durasi_praktek: number;
}

export interface Competency {
  kompetensi: string;
  durasi_teori: number;
  durasi_praktek: number;
}

export interface CurriculumSyllabusRequest {
  capabilityId: string;
  total_durasi: number;
  regulasiGSEs: RegulationGSE[];
  kompetensis: Competency[];
}
