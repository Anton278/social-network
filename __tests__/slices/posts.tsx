import { RequestStatus } from "@/models/RequestStatus";
import { makeStore } from "@/redux/store";

describe("posts slice", () => {
  it("should return init state", () => {
    const store = makeStore();
    const posts = store.getState().posts;
    expect(posts).toEqual({ posts: [], status: RequestStatus.Loading });
  });
});
