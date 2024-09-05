import fs from "fs";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { VFile } from "vfile";
import { beforeEach, describe, expect, test, vi } from "vitest";
import remarkIncludeCode from "./remark-code-import";

vi.mock("fs");

const markdownFile = new VFile({ path: "/Users/ratatui/test.md" });

describe("remarkIncludeCode", () => {
  const processor = unified().use(remarkParse).use(remarkIncludeCode).use(remarkStringify);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should include file for raw markdown content", () => {
    const mockFileContent = "This is the content of the included file.";
    vi.spyOn(fs, "readFileSync").mockReturnValue(mockFileContent);

    const markdown = "```markdown\n{{#include ./included-file.md}}\n```";
    const expected = "```markdown\nThis is the content of the included file.\n```\n";

    const result = processor.processSync(markdown).toString();
    expect(result).toBe(expected);
  });

  test("should include file content without anchor", () => {
    const mockFileContent = "This is the content of the included file.";
    vi.spyOn(fs, "readFileSync").mockReturnValue(mockFileContent);

    markdownFile.value = "```markdown\n{{#include ./included-file.md}}\n```";
    const expected = "```markdown\nThis is the content of the included file.\n```\n";

    const result = processor.processSync(markdownFile).toString();
    expect(result).toBe(expected);
  });

  test("should include multiple includes in a code block", () => {
    const mockFileContent = "This is the content of the included file.";
    vi.spyOn(fs, "readFileSync").mockReturnValue(mockFileContent);

    markdownFile.value =
      "```markdown\n{{#include ./included-file.md}}\n{{#include ./included-file.md}}\n```";
    const expected =
      "```markdown\nThis is the content of the included file.\nThis is the content of the included file.\n```\n";

    const result = processor.processSync(markdownFile).toString();
    expect(result).toBe(expected);
  });

  test("should include file content with line range anchor", () => {
    const mockFileContent = "Line 1\nLine 2\nLine 3\nLine 4\nLine 5";
    vi.spyOn(fs, "readFileSync").mockReturnValue(mockFileContent);

    markdownFile.value = "```markdown\n{{#include ./included-file.md:2:4}}\n```";
    const expected = "```markdown\nLine 2\nLine 3\nLine 4\n```\n";

    const result = processor.processSync(markdownFile).toString();
    expect(result).toBe(expected);
  });

  test("should include file content with named anchor", () => {
    const mockFileContent = `
      // ANCHOR: start
      This is the content of the included file.
      // ANCHOR_END: start
    `;
    vi.spyOn(fs, "readFileSync").mockReturnValue(mockFileContent);

    markdownFile.value = "```markdown\n{{#include ./included-file.md:start}}\n```";
    const expected = "```markdown\n      This is the content of the included file.\n```\n";

    const result = processor.processSync(markdownFile).toString();
    expect(result).toBe(expected);
  });

  test("should throw error for file path", () => {
    vi.spyOn(fs, "readFileSync").mockImplementation(() => {
      throw new Error("File not found");
    });

    markdownFile.value = "```markdown\n{{#include ./invalid-file.md}}\n```";

    expect(() => processor.processSync(markdownFile)).toThrow(
      "Unable to process includes for /Users/ratatui/test.md. Unable to include file '/Users/ratatui/invalid-file.md'. File not found",
    );
  });

  test("should throw error for missing anchor", () => {
    const mockFileContent = "This is the content of the included file.";
    vi.spyOn(fs, "readFileSync").mockReturnValue(mockFileContent);

    markdownFile.value = "```markdown\n{{#include ./included-file.md:missingAnchor}}\n```";

    expect(() => processor.processSync(markdownFile)).toThrow(
      "Unable to process includes for /Users/ratatui/test.md. Unable to include file '/Users/ratatui/included-file.md'. Anchor 'missingAnchor' not found",
    );
  });

  test("should include file content with root path alias", () => {
    const mockFileContent = "This is the content of the included file.";
    vi.spyOn(fs, "readFileSync").mockReturnValue(mockFileContent);

    markdownFile.value = "```markdown\n{{#include @/included-file.md}}\n```";
    const expected = "```markdown\nThis is the content of the included file.\n```\n";

    const result = processor.processSync(markdownFile).toString();
    expect(result).toBe(expected);
  });
});
