import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import type { RequestStatus } from "@/models/RequestStatus";

export interface InitialState {
  usersDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[];
  status: RequestStatus;
}
