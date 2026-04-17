#!/usr/bin/env bash
# Blair installer — copies the .claude agent bundle into your project
# Usage: bash install.sh /path/to/your/project

set -e

BLAIR_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-}"

# ── Resolve target ────────────────────────────────────────────────────────────

if [ -z "$TARGET" ]; then
  echo ""
  echo "Blair — AI CMO Agent"
  echo "────────────────────"
  echo ""
  read -p "Where is your project? (path, or press Enter for current directory): " TARGET
  TARGET="${TARGET:-$(pwd)}"
fi

TARGET="$(cd "$TARGET" 2>/dev/null && pwd)" || {
  echo "Error: directory not found: $1"
  exit 1
}

# ── Safety checks ────────────────────────────────────────────────────────────

echo ""
echo "Installing Blair into: $TARGET"
echo ""

if [ -d "$TARGET/.claude" ]; then
  echo "⚠️  A .claude directory already exists in this project."
  echo "   Blair will merge its agents and skills into it."
  echo "   Existing files with the same name will be overwritten."
  echo ""
  read -p "Continue? (y/N): " CONFIRM
  case "$CONFIRM" in
    [yY]) ;;
    *) echo "Cancelled."; exit 0 ;;
  esac
else
  read -p "Install Blair into $TARGET? (y/N): " CONFIRM
  case "$CONFIRM" in
    [yY]) ;;
    *) echo "Cancelled."; exit 0 ;;
  esac
fi

# ── Copy ─────────────────────────────────────────────────────────────────────

echo ""
echo "Copying Blair agents and skills..."

# Agents
mkdir -p "$TARGET/.claude/agents"
cp "$BLAIR_DIR/.claude/agents"/blair*.md "$TARGET/.claude/agents/"

# Skills
mkdir -p "$TARGET/.claude/skills"
for skill_dir in "$BLAIR_DIR/.claude/skills"/blair-*/; do
  skill_name="$(basename "$skill_dir")"
  mkdir -p "$TARGET/.claude/skills/$skill_name"
  cp "$skill_dir/SKILL.md" "$TARGET/.claude/skills/$skill_name/SKILL.md"
done

# CMO directory (brand profile template only — never overwrite an existing brand.md)
mkdir -p "$TARGET/.claude/cmo"
cp "$BLAIR_DIR/.claude/cmo/brand.md.example" "$TARGET/.claude/cmo/brand.md.example"

if [ ! -f "$TARGET/.claude/cmo/campaigns.md" ]; then
  cp "$BLAIR_DIR/.claude/cmo/campaigns.md" "$TARGET/.claude/cmo/campaigns.md"
fi

if [ ! -f "$TARGET/.claude/cmo/insights.md" ]; then
  cp "$BLAIR_DIR/.claude/cmo/insights.md" "$TARGET/.claude/cmo/insights.md"
fi

# Add brand.md to .gitignore if a .gitignore exists
if [ -f "$TARGET/.gitignore" ]; then
  if ! grep -q "cmo/brand.md" "$TARGET/.gitignore" 2>/dev/null; then
    echo "" >> "$TARGET/.gitignore"
    echo "# Blair — brand profiles contain private strategy and competitor intel" >> "$TARGET/.gitignore"
    echo ".claude/cmo/brand.md" >> "$TARGET/.gitignore"
    echo ".claude/cmo/brands/*/brand.md" >> "$TARGET/.gitignore"
    echo ".claude/cmo/active-brand" >> "$TARGET/.gitignore"
    echo "Added Blair entries to .gitignore"
  fi
fi

# ── Done ─────────────────────────────────────────────────────────────────────

echo ""
echo "✓ Blair installed successfully."
echo ""
echo "Next steps:"
echo "  1. Open $TARGET in Claude Code"
echo "  2. Run /blair:start to set up your brand profile"
echo "  3. Start any marketing task — Blair handles the rest"
echo ""
echo "Full command list: /blair:help"
echo ""
