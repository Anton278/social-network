import { RequestStatus } from "@/models/RequestStatus";
import { makeStore } from "@/redux/store";

describe("auth slice", () => {
  it("should have proper init state", () => {
    const store = makeStore();
    const auth = store.getState().auth;
    expect(auth).toEqual({ isAuthed: false, status: RequestStatus.Loading });
  });

  it("should proper handle setIsAuthed case", () => {
    const store = makeStore();

    store.dispatch({ type: "auth/setIsAuthed", payload: true });

    const auth = store.getState().auth;

    expect(auth).toEqual({ isAuthed: true, status: RequestStatus.IDLE });

    store.dispatch({ type: "auth/setIsAuthed", payload: false });

    expect(store.getState().auth).toEqual({
      isAuthed: false,
      status: RequestStatus.IDLE,
    });
  });
});
