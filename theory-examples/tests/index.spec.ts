import { describe, expect, test } from "vitest";
import { onePunch } from "../src/index";

describe("onePunch function tests", () => {
  test("onePunch('') returns Broken!", () => {
    expect(onePunch('')).toBe('Broken!');
  });

  test("onePunch('') returns Broken!", () => {
    expect(onePunch('')).toBe('Broken!');
  });
});