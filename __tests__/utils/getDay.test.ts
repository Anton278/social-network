import { getDay } from "@/utils/getDay";

describe("getDay util", () => {
  it("should convert timestamp to human readable date", () => {
    const timeStamp1 = 1699273728280; // 6 November
    const day1 = getDay(timeStamp1);
    expect(day1).toBe("6 November");
  });
});
