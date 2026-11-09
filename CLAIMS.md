# Claims register

Every factual claim this website makes about Empire Management Services, what backs it up, and who confirmed it.
**Read this before adding or changing marketing copy.** Misleading claims on a business website can breach the
Australian Consumer Law (misleading or deceptive conduct), and procurement teams check them.

Confirmed by the owner on **9 November 2026** unless stated otherwise.

## Rules for editing the site

1. Only publish a claim you can document if a client asks. If you cannot find the paper, do not publish it.
2. Avoid absolutes ("all", "every", "only", "zero", "100%") unless you can prove them every time.
3. No performance figures (percentages, "zero incidents", audit scores) without records and, for client work, the
   client's written permission to be named.
4. Name a platform ("Google", "Facebook") next to a review only when the review is linked. The site enforces this.
5. When a certificate or insurance policy lapses or is renewed, update `MANAGEMENT_STANDARDS` in `lib/constants.ts`
   and the Certifications & Compliance page the same day.

## Confirmed and backed by documents

| Claim | Where it appears | Evidence to keep on file |
|---|---|---|
| ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified | Home, About, Risk & Compliance, chatbot, location pages, `/compliance` | The three current certificates, with the certifying body, certificate numbers and expiry dates. Diary the renewal dates. |
| Public liability insurance | Risk & Compliance, service pages, `/compliance` | Current certificate of currency (insurer, policy number, amount, expiry). |
| All cleaning staff are police-checked | Home ("Police-Checked Staff"), Values, Risk & Compliance, `/compliance` | A register showing a current police check for every cleaner, with dates. |
| Security-cleared teams available for government and sensitive sites | Services, Values, Risk & Compliance, `/compliance` | Which staff hold which clearance level, and when it was granted. Wording is "available", not "all staff cleared". |
| Client logos shown (11 organisations) | Home carousel | Written permission from each client (an email is enough). Keep it. |
| 30+ years in business | Home, About, hero, footer | Records showing the business has traded since 1995 (invoices, contracts, accounts). **Note:** the current legal entity (Ergatis Services Pty Ltd) only has its ABN from 2006 and the business name from 2007, so if the 1995 start was under an earlier entity or as a sole trader, keep evidence of that and be ready to explain it. |
| 80+ active clients | Home, hero, About | A current client list. |
| 100+ cleaning staff | Stat tile | A current staff or payroll headcount. |
| 2,500+ hours serviced each week | Stat tile | Rostered or timesheet hours for a typical week. |
| 100,000m² serviced | Home, hero, About | Site area schedule across contracts. |
| Hellenic Club testimonial (Michael Haddad) | Home | The client's permission to quote. It is labelled as a direct testimonial, not a Google review. Add the review link if it is also on Google. |

## Removed because they could not be substantiated

| Removed | Why |
|---|---|
| `/commercial` case studies ("Zero security incidents across 5+ years", "98%+ quality audit scores", "reduced emergency call-outs by 60%", "ACT Government Multi-Building Complex", "12-building strata portfolio") | Specific figures and named clients with no evidence. The page now redirects to `/services`. Bring case studies back only with real records and written client approval. |
| "All staff vetted and cleared" / "all staff undergo security clearance checks" | Not true: the job application accepts people with no clearance. Replaced with police-checked staff plus cleared teams available. |
| "Google" label on the Hellenic Club testimonial | There was no link to a Google review. |
| "States" on the stat tile | The ACT is a territory. Now "States & Territories". |

## Still unverified (confirm, soften or remove)

These were not part of the owner's confirmation. They are plausible, but nobody has shown evidence yet.

| Claim | Where | Suggestion |
|---|---|---|
| Staff sign confidentiality agreements before working on any site | Values | Keep a signed copy per staff member, or say "sign confidentiality agreements where required". |
| A SWMS and a Duty Statement are prepared "for every site we service" | Risk & Compliance | Confirm this is true for every site, or say "for each contract". |
| "Only eco-certified, biodegradable cleaning products used on every site" and "eco-certified" products | About (Eco-Friendly), Risk & Compliance | Name the certification scheme, or say "we use environmentally responsible, certified products where possible". |
| Regular quality audits and reporting; "audit-ready" | Risk & Compliance | Keep sample audit reports. |
| "Fully insured and OH&S compliant" | Window cleaning service page | Covered by insurance above; "OH&S compliant" is a legal-compliance claim, so keep the evidence. |
| "Trusted by leading organisations" | Home | A subjective claim; fine while the client list above is current. |

## Optional: show certificate details on the website

`MANAGEMENT_STANDARDS` in `lib/constants.ts` accepts `certifiedBy`, `certificateNumber` and `validUntil` for each
standard. Add the real values from each certificate and the Certifications & Compliance page will display them.
Leave them out if you would rather share details only on request.
