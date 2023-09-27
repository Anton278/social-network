import { RequestStatus } from "@/models/RequestStatus";
import { User } from "@/models/User";

export interface InitialState extends User {
  status: RequestStatus;
}
