---
name: commit
description: Create a git commit for all uncommitted changes with a conventional commit message. Use when the user wants to commit work, save progress, or finish a task with a proper feat/fix/docs tag.
---

# Commit: Stage and Commit Changes

Create a new commit for all uncommitted changes.

1. Run `git status && git diff HEAD && git status --porcelain` to see what files are uncommitted
2. Add the untracked and changed files
3. Add an atomic commit message with an appropriate message
4. Add a tag such as `feat`, `fix`, `docs`, etc. that reflects the work
