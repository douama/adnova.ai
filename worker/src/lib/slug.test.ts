import { describe, expect, it } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("lowercases and dashes", () => {
    expect(slugify("Acme Corp")).toBe("acme-corp");
  });

  it("strips diacritics (the bug fixed in Tier 1)", () => {
    expect(slugify("Société Générale")).toBe("societe-generale");
    expect(slugify("Crème Brûlée")).toBe("creme-brulee");
  });

  it("collapses consecutive non-alphanumerics", () => {
    expect(slugify("foo   bar---baz")).toBe("foo-bar-baz");
    expect(slugify("a/b\\c@d#e")).toBe("a-b-c-d-e");
  });

  it("trims leading/trailing dashes", () => {
    expect(slugify("---hello---")).toBe("hello");
  });

  it("caps at 48 chars", () => {
    expect(slugify("a".repeat(100))).toHaveLength(48);
  });

  it("falls back to 'org' when input has no alphanumerics", () => {
    expect(slugify("🚀✨")).toBe("org");
    expect(slugify("   ")).toBe("org");
    expect(slugify("")).toBe("org");
  });
});
