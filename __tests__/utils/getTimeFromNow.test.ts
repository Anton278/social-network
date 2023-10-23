import { getTimeFromNow } from "@/utils/getTimeFromNow";

const dateNow = 1698073613099;
const dateNowSeconds = Math.trunc(dateNow / 1000);

Date.now = jest.fn(() => dateNow);

describe("getTimeFromNow util", () => {
  it("should return proper time", () => {
    expect(getTimeFromNow(dateNowSeconds)).toBe("a few seconds ago");
    expect(getTimeFromNow(dateNowSeconds - 30)).toBe("a few seconds ago");
    expect(getTimeFromNow(dateNowSeconds - 44)).toBe("a few seconds ago");

    expect(getTimeFromNow(dateNowSeconds - 45)).toBe("a minute ago");
    expect(getTimeFromNow(dateNowSeconds - 60)).toBe("a minute ago");
    expect(getTimeFromNow(dateNowSeconds - 89)).toBe("a minute ago");

    expect(getTimeFromNow(dateNowSeconds - 90)).toBe(`2 minutes ago`);
    expect(getTimeFromNow(dateNowSeconds - 30 * 60)).toBe(`30 minutes ago`);
    expect(getTimeFromNow(dateNowSeconds - 44 * 60)).toBe(`44 minutes ago`);

    expect(getTimeFromNow(dateNowSeconds - 45 * 60)).toBe("an hour ago");
    expect(getTimeFromNow(dateNowSeconds - 60 * 60)).toBe("an hour ago");
    expect(getTimeFromNow(dateNowSeconds - 89 * 60)).toBe("an hour ago");

    expect(getTimeFromNow(dateNowSeconds - 90 * 60)).toBe(`2 hours ago`);
    expect(getTimeFromNow(dateNowSeconds - 15 * 60 * 60)).toBe(`15 hours ago`);
    expect(getTimeFromNow(dateNowSeconds - 21 * 60 * 60)).toBe(`21 hours ago`);

    expect(getTimeFromNow(dateNowSeconds - 22 * 60 * 60)).toBe("a day ago");
    expect(getTimeFromNow(dateNowSeconds - 30 * 60 * 60)).toBe("a day ago");
    expect(getTimeFromNow(dateNowSeconds - 35 * 60 * 60)).toBe("a day ago");

    expect(getTimeFromNow(dateNowSeconds - 36 * 60 * 60)).toBe("2 days ago");
    expect(getTimeFromNow(dateNowSeconds - 20 * 24 * 60 * 60)).toBe(
      "20 days ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 25 * 24 * 60 * 60)).toBe(
      "25 days ago"
    );

    expect(getTimeFromNow(dateNowSeconds - 26 * 24 * 60 * 60)).toBe(
      "a month ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 30 * 24 * 60 * 60)).toBe(
      "a month ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 44 * 24 * 60 * 60)).toBe(
      "a month ago"
    );

    expect(getTimeFromNow(dateNowSeconds - 45 * 24 * 60 * 60)).toBe(
      "2 months ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 80 * 24 * 60 * 60)).toBe(
      "3 months ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 319 * 24 * 60 * 60)).toBe(
      "11 months ago"
    );

    expect(getTimeFromNow(dateNowSeconds - 320 * 24 * 60 * 60)).toBe(
      "a year ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 364 * 24 * 60 * 60)).toBe(
      "a year ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 547 * 24 * 60 * 60)).toBe(
      "a year ago"
    );

    expect(getTimeFromNow(dateNowSeconds - 548 * 24 * 60 * 60)).toBe(
      "2 years ago"
    );
    expect(getTimeFromNow(dateNowSeconds - 1000 * 24 * 60 * 60)).toBe(
      "3 years ago"
    );
  });
});
