import { Capability } from "./capability.model";

export interface CreateCot {
  capabilityId: string;
  startDate: string;
  endDate: string;
  trainingLocation: string;
  theoryInstructorRegGse: string;
  theoryInstructorCompetency: string;
  practicalInstructor1: string;
  practicalInstructor2: string;
  status?: boolean;
}

export interface UpdateCot {
  id: string;
  capabilityId?: string;
  startDate?: string;
  endDate?: string;
  trainingLocation?: string;
  theoryInstructorRegGse?: string;
  theoryInstructorCompetency?: string;
  practicalInstructor1?: string;
  practicalInstructor2?: string;
  status?: boolean;
}

export interface Cot {
  id: string;
  startDate: string;
  endDate: string;
  trainingLocation: string;
  theoryInstructorRegGse: string;
  theoryInstructorCompetency: string;
  practicalInstructor1: string;
  practicalInstructor2: string;
  status: boolean;
  Capability: Capability;
}

export interface CotResponse {
  code: number;
  status: string;
  data: Cot | string | Cot[];
  actions: ActionAccessRigts,
  paging: Paging;
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
