# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.0](https://github.com/jneander/utils-browser/compare/v1.0.1...v2.0.0) (2022-12-11)

### ⚠ BREAKING CHANGES

- `ClientStorage` has been replaced with `LocalStorage`, which provides the same behavior with a
  different API.
- The output of this library is no longer transpiled for browser support. That responsibility
  belongs to library consumers.

### Features

- convert to typescript
  ([e20b1ef](https://github.com/jneander/utils-browser/commit/e20b1ef96d8ae65208ca67325971e8fc02d4d66f))
- replace client-storage with local-storage
  ([e28f59a](https://github.com/jneander/utils-browser/commit/e28f59a4aced7fdc457399550db677ae4a541809))

### Miscellaneous Chores

- build using tsc
  ([7aeb137](https://github.com/jneander/utils-browser/commit/7aeb137a36935867d834324105fad28b366c50e0))
