# Manual smoke test (maintainers)

Run after changing agents or skills, or after `install.sh` / `install.bat` into a clean project.

## Environment

- [ ] Claude Code installed and logged in
- [ ] Test project has Blair installed (`install.sh` / `install.bat` from repo root)

## Core flows

1. **`/blair:start`** (or fast mode if documented) completes and creates `.claude/cmo/brand.md` (or marks `[NEEDS BRIEF]` where expected).
2. **`/blair:status`** reads profile without error.
3. **`/blair:competitor TestCo`** (fictional): researcher attempts tool-based fetch or clearly states **gaps** if tools unavailable.
4. **`/blair:pipeline-impact`**: skill presents **attribution limits** and asks for user numbers or proceeds with logs only.
5. **Docs present:** `docs/security-and-data.md`, `docs/case-studies/README.md` open in repo.

## Multi-brand (optional)

1. `/blair:start client-a` and `/blair:switch client-a` if your install supports slug onboarding.
2. Confirm `active-brand` or equivalent points at the right folder.

## Gmail / Calendar (optional)

- If no Google MCP: confirm email skill still outputs **copy-paste-ready** full text.

Record failures as GitHub issues using the “Bad output / research quality” template.
