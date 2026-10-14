# Trace — Campaign intelligence

An evidence-led campaign strategy workspace built with React, TypeScript, Vinext, and Cloudflare Workers.

## Run locally

Install dependencies with `npm install`, then run `npm run dev`. The starter's environment loader supports ignored `.env.local` files. Set `OPENAI_API_KEY` there to enable live analysis. Optional `OPENAI_MODEL` defaults to `gpt-4.1`. For Sites deployment, configure the same values as server runtime secrets. Never expose a key through a public environment variable.

The app opens an explicitly labeled fictional example workspace. All navigation, weighted connections, recommendation drill-down, citation inspection, campaign editing, and JSON export work without a key. New analysis, adding parsed historical campaigns, and generating additional recommendations require a live API connection. They show an explicit error when unavailable; no simulated AI results are substituted.

## Workflow

- Use **New analysis** or **Use my data** to paste notes or upload PDF, TXT, MD, or CSV files.
- PDF inputs are passed in memory to the OpenAI Responses API, which can inspect text, tables and page visuals. Text inputs retain source excerpts. PDFs are limited to 10 MB; text to 80,000 characters.
- Historical campaigns appear on the left; proposed experiments on the right. Line widths map to influence weights (0–1), not probabilities of success.
- Select a proposal to inspect rationale, experiment design, measurement plan, audience, and source connections.
- Editing a campaign preserves original quotes and flags the board for re-audit. The re-audit action uses the edited information as new user-supplied evidence.
- Export downloads a JSON board with quotations, weights, and stale/example labels.

## Grounding and limitations

The server requests strict JSON-schema output, validates it again with Zod, rejects invalid graph references and out-of-range weights, and verifies that text quotations appear in the supplied source. Missing facts use `Not provided in source`. PDF quotation/page accuracy is model-extracted and requires human review; it is not independently OCR-verified. Strict schemas and quotation checks reduce hallucinations but do not prove that all derived interpretations are true. Similarity between newly generated proposals is prompted; exact duplicate titles are rejected, but semantic uniqueness still needs review.

The analysis request has a 28-second upstream timeout and a 32-second browser timeout. The target is 15–30 seconds, but latency is not guaranteed and needs measurement with the configured account and realistic reports. Shorten source documents if analysis times out.

## Privacy

There is no application database, upload bucket, browser local storage, or persisted campaign history. Source documents and boards are held in memory for the current session. Refresh clears the board. Export is an explicit local download. Live analysis sends content to OpenAI over HTTPS with `store: false`; the app does not log document content. This does not establish zero retention by the provider: provider abuse-monitoring retention and account controls still apply. API data is not used for model training by default, subject to account opt-ins. Review https://developers.openai.com/api/docs/guides/your-data before handling sensitive data. Deployments are owner-private through Sites authentication; do not make the endpoint public without adding authentication, request rate limiting, and usage controls.

## Verification

`node --experimental-strip-types --test tests/grounding.test.mjs`

`npx tsc --noEmit`

`npm run build`

Live API and PDF accuracy tests require an authorized, configured API key. The sample board is not evidence of model quality or runtime latency.
