# EmailJS Templates for Gourdshades

This folder contains copy‑paste ready EmailJS template bodies (HTML and Text) for the Contact and Enquiry flows, both Business notifications and Customer confirmations.

Use these subjects when creating templates in EmailJS:

- Contact → Business: `New Contact from ${name} — Gourdshades`
- Enquiry → Business: `New Enquiry (${total_items} items) from ${name} — Gourdshades`
- Contact → Customer: `Thanks for contacting Gourdshades, ${name}`
- Enquiry → Customer: `Thanks for your enquiry, ${name} — Gourdshades`

Template variables used:

- Contact: `name`, `email`, `phone`, `message`, `timestamp`, `site_url`
- Enquiry adds: `items_summary`, `total_items`, `total_value`

How to use:

1. In EmailJS, create templates for each flow (you may choose Business only, or both Business and Customer confirmations).
2. Paste the content from the corresponding `.html` or `.txt` file into the template body (HTML recommended).
3. Set the Subject as listed above.
4. Set recipients:
   - Business templates → your team inbox (e.g., `hello@gourdshades.com`)
   - Customer templates → `${email}` so the customer receives the confirmation
5. Optional: set “Reply-To” to `${email}` in the EmailJS template settings so replies go to the sender.