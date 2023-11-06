import { getTime } from "@/utils/getTime";

describe("getTime util", () => {
  it("should return hours and minutes from timestamp", () => {
    const timeStamp1 = 1699261500; // 09:05
    const timeStamp2 = 1699272000; // 12:00
    const res1 = getTime(timeStamp1);
    const res2 = getTime(timeStamp2);
    expect(res1).toBe("09:05");
    expect(res2).toBe("12:00");
  });
});
