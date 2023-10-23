import type { RequestStatus } from "@/models/RequestStatus";
import type { User } from "@/models/User";

export interface InitialState {
  users: User[];
  status: RequestStatus;
}
