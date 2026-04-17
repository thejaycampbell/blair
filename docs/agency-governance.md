# Agency and multi-brand governance

Blair supports multiple brands under `.claude/cmo/brands/<slug>/` with an active pointer in `.claude/cmo/active-brand`.

## Who owns what

- **Client strategy** in `brands/<slug>/brand.md` is sensitive. Treat each slug like a client folder.
- **Your team** should agree who may run `/blair:switch`, edit profiles, and commit campaign logs.

## Git and privacy

- Per-brand `brand.md` files are **gitignored** in this repo’s default `.gitignore` pattern. If you customize ignore rules, confirm you do not accidentally commit client profiles.
- For extra safety, add a repo-level ignore for a client code name if needed:

```gitignore
.claude/cmo/brands/acme-corp/
```

## Export before offboarding

When ending a client engagement:

1. Export `brand.md`, `campaigns.md`, and `insights.md` for the client (format they prefer).
2. Remove or archive the `brands/<slug>/` directory locally.
3. Rotate any shared API keys or OAuth tokens that were used for that client’s automations.

## What Blair does not guarantee

Blair does not provide legal **NDA enforcement**, **SOC2** reports, or **client isolation** beyond filesystem layout. Large agencies should layer their own access control and contracts.
