#!/usr/bin/env python3
"""Set the modified-time property in an Obsidian note's YAML frontmatter."""

from __future__ import annotations

import argparse
import re
import sys
from datetime import datetime
from pathlib import Path

FRONTMATTER_DELIMITER = "---"
MODIFIED_KEY = re.compile(r"^修改时间[ \t]*:")
MODIFIED_LINE = re.compile(
    r"^(?P<prefix>修改时间[ \t]*:[ \t]*)(?P<value>.*?)(?P<suffix>[ \t]*(?:#.*)?)$"
)
CREATED_KEY = re.compile(r"^创建时间[ \t]*:")


def line_body(line: str) -> str:
    return line.rstrip("\r\n")


def line_ending(line: str) -> str:
    if line.endswith("\r\n"):
        return "\r\n"
    if line.endswith(("\n", "\r")):
        return line[-1]
    return ""


def frontmatter_end(lines: list[str]) -> int:
    if not lines or line_body(lines[0]) != FRONTMATTER_DELIMITER:
        raise ValueError("note must begin with YAML frontmatter")

    for index in range(1, len(lines)):
        if line_body(lines[index]) == FRONTMATTER_DELIMITER:
            return index
    raise ValueError("YAML frontmatter has no closing delimiter")


def update_frontmatter(text: str, timestamp: str) -> str:
    lines = text.splitlines(keepends=True)
    closing_index = frontmatter_end(lines)
    modified_indices = [
        index for index in range(1, closing_index) if MODIFIED_KEY.match(line_body(lines[index]))
    ]
    if len(modified_indices) > 1:
        raise ValueError("frontmatter contains more than one 修改时间 property")

    if modified_indices:
        index = modified_indices[0]
        body = line_body(lines[index])
        ending = line_ending(lines[index])
        match = MODIFIED_LINE.fullmatch(body)
        if match is None:
            raise ValueError("修改时间 property is not in the expected format")
        suffix = match.group("suffix")
        lines[index] = f"{match.group('prefix')}{timestamp}{suffix}{ending}"
        return "".join(lines)

    created_indices = [
        index for index in range(1, closing_index) if CREATED_KEY.match(line_body(lines[index]))
    ]
    insertion_index = created_indices[0] + 1 if len(created_indices) == 1 else closing_index
    newline = next(
        (line_ending(line) for line in lines[: closing_index + 1] if line_ending(line)),
        "\n",
    )
    if insertion_index and not line_ending(lines[insertion_index - 1]):
        lines[insertion_index - 1] += newline
    lines.insert(insertion_index, f"修改时间: {timestamp}{newline}")
    return "".join(lines)


def update_file(path: Path) -> str:
    if path.suffix.lower() != ".md":
        raise ValueError("target must be a Markdown file")

    original = path.read_bytes()
    has_bom = original.startswith(b"\xef\xbb\xbf")
    text = original.decode("utf-8-sig")
    timestamp = datetime.now().astimezone().isoformat(timespec="seconds")
    updated = update_frontmatter(text, timestamp)
    encoded = updated.encode("utf-8")
    path.write_bytes((b"\xef\xbb\xbf" if has_bom else b"") + encoded)
    return timestamp


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("note", type=Path, help="Markdown file to update")
    args = parser.parse_args()

    try:
        timestamp = update_file(args.note)
    except (OSError, UnicodeError, ValueError) as error:
        parser.exit(1, f"Error: {error}\n")

    print(f"Updated 修改时间 in {args.note} to {timestamp}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
