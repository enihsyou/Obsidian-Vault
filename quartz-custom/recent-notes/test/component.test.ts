import { describe, expect, it } from "vitest";
import { RecentNotes, filterListedPages, isFolderPageSlug, isTagPageSlug } from "../src/index";

describe("RecentNotes", () => {
  it("is exported as a function", () => {
    expect(typeof RecentNotes).toBe("function");
  });

  it("returns a component with css property", () => {
    const component = RecentNotes();
    expect(typeof component).toBe("function");
    expect(typeof component.css).toBe("string");
  });
});

describe("filterListedPages", () => {
  it("excludes pages marked unlisted: true", () => {
    const pages = [
      { slug: "a" },
      { slug: "b", unlisted: true },
      { slug: "c" },
      { slug: "d", unlisted: false },
    ];
    const result = filterListedPages(pages);
    expect(result.map((p) => p.slug)).toEqual(["a", "c", "d"]);
  });

  it("returns pages unchanged when none are unlisted", () => {
    const pages = [{ slug: "a" }, { slug: "b" }];
    expect(filterListedPages(pages)).toEqual(pages);
  });

  it("handles empty input", () => {
    expect(filterListedPages([])).toEqual([]);
  });
});

describe("isTagPageSlug", () => {
  it("matches the tags index and any slug under the tags/ prefix", () => {
    expect(isTagPageSlug("tags")).toBe(true);
    expect(isTagPageSlug("tags/index")).toBe(true);
    expect(isTagPageSlug("tags/recipes")).toBe(true);
    expect(isTagPageSlug("tags/sub/nested")).toBe(true);
  });

  it("does not match ordinary notes or folders that merely contain 'tags'", () => {
    expect(isTagPageSlug("notes/about-tags")).toBe(false);
    expect(isTagPageSlug("mytags/index")).toBe(false);
    expect(isTagPageSlug("blog/post")).toBe(false);
  });

  it("returns false for undefined or empty slugs", () => {
    expect(isTagPageSlug(undefined)).toBe(false);
    expect(isTagPageSlug("")).toBe(false);
  });
});

describe("isFolderPageSlug", () => {
  it("matches folder-index conventions used by Quartz", () => {
    expect(isFolderPageSlug("folder/")).toBe(true);
    expect(isFolderPageSlug("folder/index")).toBe(true);
    expect(isFolderPageSlug("folder/index.md")).toBe(true);
    expect(isFolderPageSlug("folder/index.html")).toBe(true);
  });

  it("does not match ordinary content slugs", () => {
    expect(isFolderPageSlug("folder/post")).toBe(false);
    expect(isFolderPageSlug("post")).toBe(false);
  });

  it("returns false for undefined or empty slugs", () => {
    expect(isFolderPageSlug(undefined)).toBe(false);
    expect(isFolderPageSlug("")).toBe(false);
  });
});
