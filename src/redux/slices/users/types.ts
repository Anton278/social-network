import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface InitialState {
  usersDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[];
}
