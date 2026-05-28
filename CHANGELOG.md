# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Respect the `file.data.unlisted` convention. Pages marked `unlisted` are never shown in the recent notes list. The unlisted filter runs before any user-supplied `opts.filter`.
- Exported `filterListedPages` helper for reuse and testing.
- Unit tests for `filterListedPages`.
- New `hideTagPages` option (default `false`) that excludes tag index pages (slugs under the `tags/` prefix) from the recent notes list. The filter runs before any user-supplied `opts.filter`.
- New `hideFolderPages` option (default `false`) that excludes folder index pages (slugs matching Quartz's folder-path convention) from the recent notes list. The filter runs before any user-supplied `opts.filter`.
- Exported `isTagPageSlug` and `isFolderPageSlug` helpers for reuse and testing, plus unit tests for both.

- Initial Quartz community plugin template.
