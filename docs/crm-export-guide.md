# CRM Export Guide — Blair Pipeline Attribution

Blair's `/blair:pipeline-impact` can analyze real pipeline data from any CRM. You don't need an integration — just export a CSV and drop it in one place.

---

## How it works

1. Export a CSV from your CRM (instructions below).
2. Save it to `.claude/cmo/data/pipeline-export.csv` in your project.
3. Run `/blair:pipeline-impact` — Blair reads the file, maps the columns, and builds your attribution analysis.

No manual pasting. No markdown tables. Blair handles the column mapping.

---

## HubSpot

**Contacts / Leads export:**
1. CRM > Contacts > All Contacts
2. Filter by date range (e.g. "Create date: last 90 days")
3. Actions > Export
4. Select columns: First name, Last name, Email, Lead source, Create date, Lifecycle stage, Associated deal count
5. Export as CSV

**Deals export:**
1. CRM > Deals > All Deals
2. Filter by close date or create date
3. Actions > Export
4. Select columns: Deal name, Amount, Deal stage, Close date, Create date, Deal owner, Original source, Associated contacts
5. Export as CSV

**Save to:** `.claude/cmo/data/pipeline-export.csv`

---

## Salesforce

**Leads report:**
1. Reports > New Report > Leads
2. Columns: Lead Source, Status, Created Date, Converted, Converted Opportunity
3. Filters: Created Date = last 90 days
4. Run > Export > CSV

**Opportunities report:**
1. Reports > New Report > Opportunities
2. Columns: Opportunity Name, Amount, Stage, Close Date, Created Date, Lead Source, Owner
3. Filters: Close Date = this quarter
4. Run > Export > CSV

**Save to:** `.claude/cmo/data/pipeline-export.csv`

---

## Pipedrive

**Deals export:**
1. Deals > List view
2. Filter by date range
3. "..." menu > Export to spreadsheet
4. Export as CSV

**Key columns Blair uses:** Title, Value, Stage, Lost reason, Source, Owner, Created, Won time

**Save to:** `.claude/cmo/data/pipeline-export.csv`

---

## Close

1. Leads > Export
2. Select fields: Status, Source, Created, Opportunities
3. Opportunities > Export
4. Fields: Status, Value, Lead source, Created, Won date

**Save to:** `.claude/cmo/data/pipeline-export.csv`

---

## Spreadsheet / manual tracking

No CRM? Create a CSV with any of these columns — Blair will map what it finds:

```
date,source,lead_count,opportunities,closed_won,revenue,notes
2026-03-01,LinkedIn,45,12,3,8500,Cold outbound sequence #2
2026-03-01,Email,22,8,2,4200,Product launch campaign
2026-03-01,Referral,8,5,2,6000,Partner program
```

Minimum useful: `date`, `source`, `lead_count`, `closed_won`, `revenue`.

---

## Google Sheets

Export your pipeline tracker:
1. File > Download > Comma-separated values (.csv)
2. Save to `.claude/cmo/data/pipeline-export.csv`

---

## Column mapping

Blair auto-maps common column names across CRMs. If it can't map a column, it will ask. You only need to answer once — the mapping is saved for future imports.

---

## Keeping it fresh

Re-export monthly and overwrite the file. Blair compares against the prior snapshot in `pipeline.md` and shows you the delta — what moved, what's stalling, and where marketing is driving the most leverage.
