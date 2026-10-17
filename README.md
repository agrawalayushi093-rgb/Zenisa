# ZENISA PERFUMES

A responsive luxury fragrance frontend built with React, Vite, JSX, Tailwind CSS v4, Motion, Lucide and React Router. An Express/MySQL admin and checkout API is included. No online payment gateway is included.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

For working cart totals, checkout and admin, also complete the React admin + MySQL setup below and keep `npm run server` running. Open the local address printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

Deploy `dist/` to static hosting with an SPA fallback to `index.html` for direct route visits.

## Features

- Home, shop, collections and filtered collection pages, product details, cart, about, contact, draft policies and 404.
- URL-based search, collection, scent and occasion filters, sorting and empty states.
- Persistent browser cart with per-size quantities and prices, wishlist toggles, mobile navigation and search dialogs.
- Configurable WhatsApp inquiry containing names, sizes, quantities and estimated total. No payment or order processing.
- Desktop exit intent and mobile delayed/scroll promotion, session dismissal, focus trap, Escape support, restored focus and scroll locking.
- Demo newsletter and contact forms explicitly do not submit or store messages.
- Reduced motion support, lazy loaded photography, responsive typography and layout.

## Configuration and API preparation

Edit `src/data/products.js` for catalogue, prices, variants, categories, announcement and promotion copy. `siteConfig.whatsappNumber` is intentionally blank: set a confirmed country-code number using digits only (for example the format `91XXXXXXXXXX`, with actual digits) to enable WhatsApp. A blank number prevents sending inquiries to an invented recipient. Replace contact/social placeholders and obtain approved business policies before launch.

`src/context/Store.jsx` owns frontend cart state; pages consume structured product objects. Replace mock catalogue imports with an API service when Node/Express/MySQL is available. Validate final prices, availability and all purchase decisions on the backend at that stage.

All product names, price estimates, notes, badges, promotions, benefits, reviews and policies are sample content. Cart and wishlist use localStorage; promotion dismissal uses sessionStorage. Forms do not save personal data. These are frontend demonstrations, not actual commerce services.

## Visual assets

Original AI-generated perfume concept photography and a text wordmark provide locally rendered product placeholders. Hero, offer, experience, product, collection and ingredient assets are bundled as optimized WebP files. The final homepage follows the supplied reference composition; the generated images are visual concepts, not photographs of actual Zenisa products. No competitor imagery was copied. Unsplash occasion imagery and Google Fonts are external services requiring internet access; replace these with licensed local assets in `public/images/` and optionally self-host the fonts for production. The supplied brand reference guides the palette and visual direction; replace the text wordmark with an approved vector logo when supplied.

## Structure

`src/components/` reusable UI, `src/pages/` routes, `src/data/` mock catalogue and configuration, `src/context/` cart and wishlist, `src/styles/theme.css` tokens and responsive theme, `public/images/` production asset destination.

## Client homepage previews
The header Home menu includes a homepage design dropdown, also available in mobile navigation. Home 1 (Luxury Collection), Home 2 (Signature Storefront) and Home 3 (Emerald Atelier) are active. Home 2 includes collection tabs, a ranked fragrance strip, all six occasion categories, gifting, scent families and fragrance guidance. Add a component and enable its entry in src/data/homePreviews.js to make a new design selectable. The selected design is stored in the URL as ?home=home-1 for repeatable review links. Client access from another device requires deploying the project or sharing an accessible hosted preview; localhost URLs work only on this computer.


### Home 3 — Emerald Atelier
Open `/?home=home-3` or choose Home 3 in the header. Includes two fixed product grids with nine items each, five cards per row on desktop, responsive column counts and View More links. It also includes arched collection cards, all six occasions, scent families, a promotional campaign, experience/benefits sections, clearly marked sample reviews, an automatically scrolling inspiration gallery and a dedicated newsletter footer. Gallery motion pauses on hover, keyboard focus and its Pause button; reduced-motion preferences disable automatic movement. The gallery is local generated inspiration imagery, not a connected live Instagram feed.


Home 3 product sections now use static grids (five desktop columns, nine total products, no horizontal scroll or arrows), with wider page gutters and increased section spacing.

## Latest Home 3 composition
Announcement marquee and shared forest-green header/footer; five-slide hero; Collections; five Best Sellers; Scent; Exclusive Offers; For Him; For Her; Occasion; Why Zenisa; Customer Reviews; Instagram; dedicated footer. New Arrivals and Experience are omitted on this version. Header navigation excludes About and Contact; those pages remain accessible through footer links. Product Add to Cart buttons contain text only. Promotional controls and the beige brand strip are removed; marquee motion pauses on hover/focus and while off screen. All product, promotion and review information remains sample content.


## Home 4
Home 4 is an independent copy of Home 3, available at /?home=home-4 and in the header Home dropdown. Its page, hero, hero data, product section, For Him/For Her sections, footer and styling have separate files so future Home 4 changes can be scoped without editing Home 3. Home 3 source files were verified unchanged when creating this copy. Product data, ProductCard and global header remain shared across versions.


## React admin + MySQL catalogue management

Open http://127.0.0.1:5173/admin. Dashboard, Category and Subcategory are separate pages. Each list has a top-right Add button, search/status filters, pagination and Edit, Delete, Active/Inactive actions. Subcategories belong to a category; database foreign keys prevent deletion of a parent with child records. No categories or subcategories are seeded. Storefront mock products remain independent of this new catalogue administration.

### Installation and startup

1. Run `npm install`.
2. Run `npm run admin:setup` once. Private login details are written to `server/ADMIN-ACCESS.txt`; password hashes and the session secret are in ignored `server/.env`. Existing credentials are preserved on subsequent setup runs.
3. Configure MySQL in `server/.env` (defaults: host 127.0.0.1, port 3307, database zenisa_perfumes, user root). Put any database password in that local file only.
4. Start MySQL, then run `npm run db:setup`. This creates the database and tables only, without inserting records or overwriting existing tables.
5. Keep `npm run server` running in one terminal and `npm run dev` in another. Open the admin URL above, using 127.0.0.1 consistently for the configured login origin.

On this computer the existing XAMPP data files reported corruption. A separate clean MariaDB data directory was initialized at `server/.mysql-data` using XAMPP's bundled MySQL-compatible server. The original data directory was not repaired or overwritten. To restart the isolated server after reboot, run `powershell -ExecutionPolicy Bypass -File server/start-local-mysql.ps1` when port 3306 is free. This machine-specific script uses C:/xampp/mysql/bin/mysqld.exe; on another machine use your normal MySQL service and update .env. Do not start both servers on the same port. The local database directory is ignored by Git and is not a portable deployment artifact.

### Verification and deployment

`npm run test:admin` checks validation, password hashing, session tampering/expiry and write-request origin protection without touching database records. `npm run build` builds the frontend. `node server/verify-readonly.js` checks login and empty catalogue endpoints through the running development proxy; it is intended for the initial empty database only and never inserts records.

API endpoints: /api/admin/session, /login, /logout, /dashboard, /category-options, /categories and /subcategories. Catalogue resources support GET/POST, PUT/DELETE /:id and PATCH /:id/status. Authentication uses signed, expiring HttpOnly cookies and an environment-configured administrator, not a seeded database user. SQL values are parameterized; API errors and disconnected database states are displayed explicitly.

For production, host the built frontend with an SPA fallback, reverse-proxy /api to the Express process, use HTTPS, set NODE_ENV=production and ADMIN_ORIGIN to the exact public origin, and configure a dedicated database account with appropriate privileges. Vite's /api proxy is development-only. Keep .env, ADMIN-ACCESS.txt and database files private and backed up; never place them in public/ or dist/. Passwords are changed by updating the local environment hash and restarting the API; there is no public registration endpoint.

Current database connection: 127.0.0.1:3307, database zenisa_perfumes. The shared local server on port 3307 is now used; the isolated 3306 instance is no longer required by Zenisa. In phpMyAdmin select Giftolozy — Port 3307 (server 2).

## Cart, checkout, promotional pricing and Google reviews

Pages: `/cart`, `/checkout`, `/offers`. Admin settings: `/admin/commerce` (Checkout & Offers in the sidebar).

The cart retains product IDs, sizes and quantities in browser storage; saved product information is normalized against the current sample catalogue. All enquiry prices are recalculated by Express from the shared catalogue in `src/data/products.js`, ignoring prices submitted by browsers. The sample 20ml variant is ₹499 for individual perfumes; existing 50/100ml prices remain samples. Gift sets are excluded from offers. A future database product repository can replace the shared sample catalogue without changing the quote/enquiry response contract.

`npm run db:setup` now also creates `commerce_settings`, without inserting a settings row or business records. Until an administrator saves settings, WhatsApp is unconfigured and both offers are inactive. Existing categories/subcategories are untouched. The admin can configure the WhatsApp number, fixed shipping fee (blank = unconfirmed; zero = free), eligible products, repeat behavior, offer combination and Google profile/Place ID.

Offer rules shown for explicit confirmation in admin:

- Buy 2 × 50ml, Get 1 Free: customer selects three eligible 50ml bottles. The lowest-priced eligible bottle is free. Repeat enabled: one free lowest-priced bottle per complete group of three; disabled: one free bottle per cart.
- 4 × 20ml for ₹999: four eligible mix-and-match bottles form a bundle. With multiple prices, highest-priced eligible bottles are bundled first. Extra bottles retain regular prices, and the discount never increases the subtotal. Repeat enabled: each complete group of four; disabled: one group per cart.
- When combining is disabled, the greatest single offer saving applies. When enabled, the separate 20ml and 50ml offers can both apply. Other coupons, delivery discounts and tax calculations are not implemented.

Eligible offer banners appear only after activation, on Home 1/2/3, relevant product pages, the offer selection and cart. Home 4's page source and design remain preserved. Product cards in the 20ml offer selection add the correct 20ml variant. Cart/checkout show subtotal, individual savings, shipping state and estimated total. Changing/removing quantities recalculates the quote. Admin settings and quotes refresh on browser focus; enquiries always recalculate again at preparation time.

Checkout validates name, country-code mobile, optional email, delivery address, city/state and six-digit Indian PIN. Consent is required before formatting a WhatsApp message. Customer details are sent to the local API to prepare the response but are not stored in MySQL, browser storage or application logs. The prepared message lists product names, sizes, quantities, prices, applied offers, savings, shipping and estimated total, plus customer details. The customer previews it, opens WhatsApp and explicitly sends it. Opening WhatsApp never confirms payment/order placement. No order is marked paid, no enquiry is automatically sent, and no payment gateway is included. Availability, shipping when unconfirmed, final prices and applicable taxes still require store confirmation.

### Google Reviews setup

1. Save the client's official Google Business Profile URL in admin. This enables a direct Google reviews link even without live API access.
2. To retrieve reviews, enable Places API (New) and billing in the client's Google Cloud project. Add the key only as `GOOGLE_PLACES_API_KEY` in `server/.env` (never in a VITE variable), save the verified Google Place ID in admin, and restart the API.
3. The homepage review component lazily requests the available subset when approached. It preserves author attribution, ratings, original review text, publish descriptions, source links and Google Maps attribution. Reviews are relevance-ordered, with no promise to retrieve every review. It does not insert or permanently cache Google review content. No API key is sent to the browser. Missing credentials, zero reviews and API failures have explicit empty/error states, with the configured profile link as a fallback.

Live Google retrieval cannot be verified until the official profile, Place ID and API key are supplied. API availability, billing and third-party charges depend on the client's account. See [Google Place Details](https://developers.google.com/maps/documentation/places/web-service/place-details) and [attribution policies](https://developers.google.com/maps/documentation/places/web-service/policies). Public draft privacy/terms pages include Google links and explain enquiry handling; client-approved business policies are still required before launch.

### Checkout verification

`npm run test:admin` covers admin security and offer thresholds, repeat caps, extra/ineligible items, combining offers, shipping, duplicate variants, invalid quantities, price tampering, settings validation and enquiry formatting. Tests use in-memory fixtures only. `node server/verify-commerce.js` checks the initial empty setup against the running API/proxy without inserting any rows; it intentionally expects no activated settings and zero catalogue records. Browser checks covered add, quantity changes, remove, empty cart, checkout pending state and a 390px mobile viewport with no horizontal overflow. Actual WhatsApp delivery and live Google review retrieval are pending official configuration.

## Active homepage
Home 4 is now the sole public homepage at /. Desktop and mobile headers use a plain Home link without a design dropdown. Legacy home query links resolve to Home 4; earlier design source files are retained but inactive. Home 4 imagery and dedicated footer also apply at the root URL.


## Home 4 shopping integration

The sole active homepage now links its exclusive-offer banner to /offers and includes both configured promotions. Inactive promotions are clearly labelled previews until the administrator confirms and activates eligible products/rules; no discounts are silently enabled. The former sample testimonials on Home 4 are replaced by the shared Google Reviews component with an honest pending state until official setup.

Checkout can now prepare the complete enquiry preview without an official WhatsApp number. The server returns a message and recalculated quote with whatsappReady=false and url=null; the external WhatsApp button stays disabled. Once the number is saved in admin, the same flow returns a usable WhatsApp link. Previewing an enquiry does not save any customer or business records. Live WhatsApp and Google setup remain deferred at the user's request.

Home 4 hero: five slides auto-advance every five seconds, with bottom-centred dots and no visible play/pause button. Keyboard focus, reduced-motion preferences, off-screen visibility and inactive browser tabs pause automatic movement. Artwork uses contained media; mobile signature artwork frames the complete bottle, and the women’s panel is isolated without clipping its bottle. Desktop and 390px mobile views were checked.


## Approved homepage sequence and colours

Home 4 now follows: announcement; navbar; hero; collections; best sellers; scent; For Him; For Her; occasion; offer 1; celebrities; offer 2; brands; Why Zenisa; customer reviews; Instagram; footer. Light sections and the announcement use #C5D0BD; dark sections, navbar, offer banners and footer use #062B1B. The full-bleed automatic hero keeps its campaign artwork.

Celebrity and brand sections use clearly labelled design placeholders from src/data/discoveryEdits.js until approved identities and product mappings are supplied. No celebrity endorsements, business relationships or live filtered catalogues are fabricated. Their Explore all fragrances links open the existing shop. Both offer banners use existing admin settings and remain explicitly marked previews until activation. No database records are inserted by these visual changes.

## Homepage-only review mode

`src/data/siteMode.js` currently sets homepageOnly=true. Public secondary routes and the offer popup are disabled, and direct secondary URLs redirect to the homepage. Homepage links to shop/products/cart/contact/policies are rendered without hrefs while preserving the visual design. Same-page section navigation remains active. Search and Add to Cart controls are temporarily disabled. Admin access is preserved independently. Set this one flag to false to restore the existing public pages and navigation; their source has not been deleted.

Latest colours: Brands #C5D0BD, Why Choose Zenisa #062B1B, Customer Reviews #C5D0BD, Instagram Gallery #FFFFFF.

## Responsive layout and smooth navigation

The final responsive stylesheet is src/styles/responsive.css. Best sellers use 5 desktop, 3 tablet and 2 phone columns; collection, scent, gender, occasion and discovery layouts reflow independently. Button labels remain large and bold. Small-screen header spacing, footer wordmark clipping and newsletter width are fixed. Colours, section order, decorative removals and homepage-only review mode are retained.

Section navigation uses native smooth scrolling with a measured sticky-header offset and supports repeated clicks on the same anchor. First page loads and reduced-motion preferences avoid animated jumps. There is no wheel/touch interception or scroll-jacking. Hero assets warm/decode during browser idle time (except on data-saving connections); off-screen hero, announcement and gallery animations pause. Actual scrolling remains controlled by the browser/device.

Verified in the in-app browser at 320, 375, 390, 768, 1024, 1440 and 1920px widths: no horizontal page overflow, clipped header/footer wordmark or overflowing CTA labels. These are viewport checks, not a claim of testing every physical device. Section anchor placement was checked against the actual sticky header.

Additional responsive checks passed at 844×390 (landscape), 1280×800 and 2560×1440. Mobile navigation was opened at 390×844; selecting a section closed the dialog and restored normal scrolling. Anchor targets sit 16px below the measured sticky header.

