import { RequestStatus } from "@/models/RequestStatus";

export interface InitialState {
  isAuthed: boolean;
  status: RequestStatus;
}
