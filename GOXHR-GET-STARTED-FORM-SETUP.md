# GoxHR Get Started form

## What the form does

- Sends each successful enquiry to `support@lulisuite.com`.
- Validates the email syntax in the browser and again in PHP.
- Checks the email domain for MX records (or an A/AAAA mail-host fallback).
- Prevents the same email address from submitting the Get Started form more than once.
- Shows a clear duplicate-email message beside the email field.
- Shows a success confirmation and closes the modal automatically after 4 seconds.
- Keeps the existing honeypot and per-visitor rate limit.

## No GoxHR application connection is used

This implementation only handles enquiries from the landing page. It does not connect to the GoxHR employee application and does not check registered GoxHR accounts.

## How duplicate checking works

To keep this beginner-friendly and avoid requiring a database, the PHP handler stores a SHA-256 hash of each successfully submitted email in a JSON file inside a `goxhr-private-data` directory created outside the public web folder (relative to the deployed PHP handler). It does not store the plain email address in that duplicate-check file. The actual enquiry details are delivered to `support@lulisuite.com` by PHP `mail()`.

The hosting account must allow PHP to create and write to that private directory. If it cannot, the form returns a temporary server error instead of silently accepting an enquiry without duplicate protection.

## Email-domain validation limitation

MX/domain DNS checks confirm that the domain has mail-routing DNS configured. They cannot prove that an individual mailbox exists or that the visitor owns it. Proving mailbox ownership would require sending a confirmation link or one-time code, which is not part of the requested flow.

## Deployment notes

1. Deploy the updated Next.js static site as usual.
2. Ensure `public/api/get-started.php` is deployed at `/api/get-started.php` on the same hosting origin.
3. Ensure PHP `mail()` is configured and permitted by the hosting provider. The message is sent to `support@lulisuite.com` from `no-reply@goxsuite.com`; configure that sender address/domain in your hosting mail settings if required.
4. Test with a valid email address, then submit the same address again. The second attempt should show the duplicate warning.
5. Test an address with a deliberately invalid/nonexistent domain. It should be rejected before the email is sent.

The destination inbox is configured in `public/api/get-started.php` as `$TO_EMAIL`.
