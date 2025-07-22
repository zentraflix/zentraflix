import { describe, expect, it, vi } from "vitest";

import { getUsersCountry } from "./country";

describe("getUsersCountry", () => {
  it("should return country from locale", async () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("en-US");
    const country = await getUsersCountry();
    expect(country).toBe("US");
  });

  it("should return country from IP when locale is not available", async () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("en");
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ countryCode: "CA" }),
    });
    const country = await getUsersCountry();
    expect(country).toBe("CA");
  });

  it("should return default country when both locale and IP lookup fail", async () => {
    vi.spyOn(navigator, "language", "get").mockReturnValue("en");
    global.fetch = vi.fn().mockRejectedValue(new Error("API Error"));
    const country = await getUsersCountry();
    expect(country).toBe("US");
  });
});
