# ZENISA PERFUMES

A responsive luxury fragrance frontend built with React, Vite, JSX, Tailwind CSS v4, Motion, Lucide and React Router. No backend or payment gateway is included.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. For a production build:

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

