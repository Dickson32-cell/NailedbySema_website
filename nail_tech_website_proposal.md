# 💅 Nail Technician Website — AI Coding Agent Proposal
**Project Codename:** NailedbySema  
**Prepared by:** Aegis Prime Development Framework  
**Target Stack:** React + Tailwind CSS + Supabase + Calendly/Custom Booking API  
**Estimated Build Time:** 3–5 Days (Agent-assisted)

---

## 1. PROJECT OVERVIEW

Build a stunning, conversion-optimized personal website for **Sema**, a nail technician and brow artist based in **Koforidua, Eastern Region, Ghana**. The site showcases her artistry, enables seamless appointment booking (studio or home service), and connects clients directly via WhatsApp, Snapchat, and TikTok.

**Contact Details to embed site-wide:**
- 📱 WhatsApp / Call: [0539649949](http://wa.me/+233539649949)
- ✉️ Email: emmanuellaasonkey9@gmail.com
- 👻 Snapchat: https://snapchat.com/t/sYn4ueqU
- 🎵 TikTok: https://www.tiktok.com/@nailtechinkoforidua
- 📍 Location: Koforidua, Eastern Region, Ghana
- 🏠 Home Service: Available across Koforidua (travel fee applies)

---

## 2. DESIGN DIRECTION

**Aesthetic:** Luxury Soft Editorial — think high-end beauty magazine meets personal nail studio.

- **Palette:** Warm porcelain white `#FDF8F4`, dusty rose `#E8B4B8`, champagne gold `#C9A96E`, and charcoal `#2C2C2C`
- **Typography:** Display font — *Playfair Display* (elegant, editorial); Body — *DM Sans* (clean, readable)
- **Mood:** Feminine, refined, warm, professional — not generic salon, but personal brand luxury
- **Motion:** Soft fade-ins on scroll, hover shimmer on gallery items, smooth booking modal transitions
- **Layout:** Asymmetric hero, overlapping image cards in gallery, diagonal section dividers

---

## 3. SITE STRUCTURE & PAGES

### Page 1 — Hero / Landing
- Full-viewport background: blurred macro shot of nail art (user-supplied or stock)
- Large editorial headline: *"Your nails. Your story."*
- Subheadline with the tech's name and specialty (e.g., gel, acrylic, nail art)
- CTA button: **"Book an Appointment"** → smooth scrolls or opens booking modal
- Floating top navbar: Logo | Services | Gallery | About | Book Now

---

### Page 2 — Services Section
- Card grid layout with soft shadows
- Each card includes: Service name, short description, duration, price, and "Book This" button
- Example services:
  - Classic Manicure — 45 min — GHS 60
  - Gel Extensions — 90 min — GHS 150
  - Nail Art Design — 60 min — GHS 120
  - Pedicure Deluxe — 75 min — GHS 100
  - **Ombre Brows** — 90 min — GHS 200
  - **Home Service** — Any service + travel fee (book via WhatsApp)

---

### Page 3 — Gallery / Portfolio
- Masonry grid layout (like Pinterest) with nail art photos
- Hover effect: soft zoom + shimmer overlay
- Filter tabs: Gel | Acrylic | Nail Art | Pedicure
- "See More" loads additional images via lazy loading

---

### Page 4 — About the Tech
- Split-section: Photo on left, bio text on right
- About Sema — based in Koforidua, specialises in gel nails, nail art, luxury pedicures, and ombre brows
- Home service availability badge / callout
- Social media links: Snapchat (https://snapchat.com/t/sYn4ueqU), TikTok (@nailtechinkoforidua), WhatsApp (0539649949)

---

### Page 5 — Booking System
- Embedded booking widget **OR** custom-built booking form
- **Option A (Quick Deploy):** Embed Calendly or Cal.com
- **Option B (Custom — Recommended):** Built-in form with:
  - Client name, phone number, email
  - Service selector (dropdown from Services list)
  - Date picker (calendar UI — only shows available days)
  - Time slot selector (based on selected date)
  - Special requests / notes text area
  - Confirmation: Email + WhatsApp notification sent to both client and nail tech
- Backend: Supabase (bookings table) or Google Sheets via API (simpler)

---

### Page 6 — Testimonials
- Rotating carousel of client reviews
- Star ratings + client first name + service booked
- Pulled from a static JSON file or Google Reviews embed

---

### Page 7 — Contact & Footer
- WhatsApp click-to-chat button (floating on all pages) → wa.me/+233539649949
- Studio address / map embed (Google Maps — Koforidua, Eastern Region)
- TikTok feed / link widget (@nailtechinkoforidua)
- Snapchat link (https://snapchat.com/t/sYn4ueqU)
- Email contact form → emmanuellaasonkey9@gmail.com
- Footer: Logo, quick links, social icons (Snapchat, TikTok, WhatsApp), phone 0539649949, copyright

---

## 4. TECHNICAL ARCHITECTURE

| Component | Technology |
|---|---|
| Frontend Framework | React (Vite) |
| Styling | Tailwind CSS + custom CSS animations |
| Fonts | Google Fonts (Playfair Display + DM Sans) |
| Booking Backend | Supabase (PostgreSQL) |
| Email Notifications | EmailJS or Resend API |
| WhatsApp Alerts | WhatsApp Business API / wa.me links |
| Image Storage | Supabase Storage or Cloudinary |
| Hosting | Vercel (free tier) |
| Domain | Custom (e.g., nailsbyname.com) |

---

## 5. DATABASE SCHEMA (Supabase)

```sql
-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT NOT NULL,
  service TEXT NOT NULL,
  is_home_service BOOLEAN DEFAULT false,
  client_address TEXT,           -- filled if home service
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending', -- pending | confirmed | cancelled
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Services Table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,            -- e.g. 'Ombre Brows', 'Pedicure Deluxe'
  description TEXT,
  duration_minutes INT,
  price_ghs NUMERIC(10,2),
  category TEXT,                 -- nails | brows | pedicure | home
  available_as_home_service BOOLEAN DEFAULT true
);

-- Blocked Dates (Sema's days off)
CREATE TABLE blocked_dates (
  id SERIAL PRIMARY KEY,
  blocked_date DATE NOT NULL,
  reason TEXT
);
```

---

## 6. BOOKING FLOW (User Journey)

```
User visits site
    ↓
Clicks "Book Now" / "Book This Service"
    ↓
Booking modal/page opens
    ↓
Selects service (includes Ombre Brows, Pedicure, Home Service)
    ↓
Toggle: "Studio Visit" or "Home Service" 
  → If Home Service: address field appears
    ↓
Picks date (unavailable/blocked dates greyed out)
    ↓
Picks available time slot
    ↓
Fills in name, phone (+233...), email
    ↓
Submits → Supabase stores booking (status: pending)
    ↓
Email confirmation sent to client + emmanuellaasonkey9@gmail.com
    ↓
WhatsApp notification sent to Sema at 0539649949
    ↓
Sema logs in to admin dashboard to confirm/cancel
    ↓
Client receives confirmation update via email + WhatsApp
```

---

## 7. ADMIN DASHBOARD (Simple)

A password-protected admin page (`/admin`) for the nail tech to:
- View all upcoming bookings (calendar view)
- Change booking status (confirm / cancel)
- Block off dates (holidays, days off)
- View monthly booking stats

---

## 8. MOBILE RESPONSIVENESS

- Fully responsive across all screen sizes
- Mobile-first booking form (large tap targets)
- Sticky "Book Now" button on mobile bottom bar
- Touch-friendly gallery swipe

---

## 9. AGENT PROMPT INSTRUCTIONS FOR AEGIS PRIME

```
TASK: Build the NailedbySema nail technician website with appointment booking.

OWNER: Sema — Koforidua, Eastern Region, Ghana
SERVICES: Classic Manicure, Gel Extensions, Nail Art, Pedicure Deluxe, Ombre Brows, Home Service
CONTACTS:
  - WhatsApp/Phone: +233539649949 (wa.me/+233539649949)
  - Email: emmanuellaasonkey9@gmail.com
  - Snapchat: https://snapchat.com/t/sYn4ueqU
  - TikTok: https://www.tiktok.com/@nailtechinkoforidua

STACK: React + Vite, Tailwind CSS, Supabase, EmailJS
DESIGN: Soft luxury editorial — Playfair Display + DM Sans, dusty rose 
        and champagne gold palette, masonry gallery, animated hero

FILES TO CREATE:
- /src/components/Navbar.jsx
- /src/components/Hero.jsx
- /src/components/Services.jsx
- /src/components/Gallery.jsx
- /src/components/BookingForm.jsx
- /src/components/About.jsx
- /src/components/Testimonials.jsx
- /src/components/Footer.jsx
- /src/pages/Home.jsx
- /src/pages/Admin.jsx
- /src/lib/supabase.js
- /src/lib/emailService.js
- tailwind.config.js (custom color palette)
- .env (SUPABASE_URL, SUPABASE_ANON_KEY, EMAILJS keys)

SUPABASE TABLES: bookings, services, blocked_dates (see schema above)

BOOKING LOGIC:
- Fetch blocked_dates from Supabase → grey out on calendar
- Fetch existing bookings for chosen date → show only open time slots
- On submit: INSERT into bookings + send email + trigger WhatsApp link

ADMIN: Simple /admin route, password-protected via Supabase Auth
       Shows bookings table with status controls and date blocker

STYLE RULES:
- Never use purple gradients
- Never use Inter or Roboto
- Use Playfair Display for all headings
- Animate hero text on load (staggered fade-up)
- Gallery items shimmer on hover
```

---

## 10. DELIVERABLES CHECKLIST

- [ ] Fully functional React app (all pages)
- [ ] Supabase database setup with seed data
- [ ] Working booking form with date/time picker
- [ ] Email confirmation system
- [ ] Admin dashboard for nail tech
- [ ] Mobile-responsive design
- [ ] Deployed to Vercel with custom domain setup guide
- [ ] README with deployment and customization instructions

---

## 11. ESTIMATED COST (If Deploying for a Client)

| Item | Cost |
|---|---|
| Vercel Hosting | Free |
| Supabase (Free Tier) | Free |
| Custom Domain | ~$12/year (e.g., nailedbysema.com) |
| EmailJS (200 emails/month free) | Free |
| Total Monthly Running Cost | ~$1/month |

---

*Proposal generated for the Aegis Prime AI Coding Agent Framework.*  
*Ready to pass directly as a system prompt + task brief to your agent.*
