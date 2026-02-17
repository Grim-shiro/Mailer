# Suggestion Relay (Separate Project)

This is a standalone relay project outside `budget-ai`.

## How it works

1. Worker saves the suggestion and POSTs `{ text, id, createdAt }` to this endpoint.
2. This endpoint sends the email via Gmail SMTP with nodemailer.

## Gmail setup

1. Use a Google account (for example `apiradev@gmail.com`).
2. Turn on 2-Step Verification in Google Account security.
3. Create an App Password for Mail and copy the 16-character password.

## Deploy on Vercel

1. Import this folder (`suggestion-relay`) as a Vercel project.
2. Set env vars:
   - `GMAIL_USER=apiradev@gmail.com`
   - `GMAIL_APP_PASS=<your-16-char-app-password>`
3. Deploy and copy URL:
   - `https://your-app.vercel.app/api/suggestion-email`

## Point Worker to relay

From `budget-ai/budget-api`:

```bash
wrangler secret put SUGGESTION_WEBHOOK_URL
# https://your-app.vercel.app/api/suggestion-email
```

Redeploy the Worker:

```bash
npm run deploy
```
