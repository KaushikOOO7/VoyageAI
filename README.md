# VoyageAI — AI-Powered Personalized Travel Assistant

> **“Development of an AI-Powered Personalized Travel Assistant for Intelligent Trip Planning and Real-Time Travel Guidance.”**

---

## 🌟 Overview & Core Idea

VoyageAI is a minimal, premium, futuristic travel-planning web application built with **React, Vite, and Tailwind CSS**.

The product flow:

```
User enters travel details
        ↓
VoyageAI creates a structured prompt
        ↓
OpenAI generates the travel plan
        ↓
VoyageAI presents the plan in an elegant, travel-focused dashboard
```

No unnecessary databases, machine-learning models, or ROS architecture. OpenAI is the intelligence of the website.

---

## 🧭 Key Features & Design Philosophy

### 1. Minimal & Premium Travel UI
- **Aesthetic**: Apple-level simplicity with a futuristic travel-AI personality.
- **Palette**: Dark sophisticated tones (`#08090e`), subtle borders (`border-white/[0.08]`), and clean typography (*Space Grotesk* and *Plus Jakarta Sans*).
- **Breathing Room**: Spacious layout, clear hierarchy, and calm, non-garish interactions.

### 2. Explicit Trip Duration Logic
- The user explicitly chooses their trip duration:
  `[ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ] [ 6 ] [ 7 ]` or `Custom` (up to 21 days).
- Starting from **Start Date**, the **End Date** is automatically calculated:
  - *e.g. Start Date: 12 October 2026, Duration: 5 Days → Automatically shows End Date: 16 October 2026.*
- The generated itinerary contains **EXACTLY** the selected number of days (Day 1 through Day X).

### 3. Step-Guided Trip Form
- **STEP 01 — Destination**: Where are you dreaming of going? (With quick preset chips like Goa, Tokyo, Paris, Bali, Swiss Alps).
- **STEP 02 — When**: Start Date + Duration selector with automatic End Date calculation.
- **STEP 03 — Budget**: Currency switcher (`₹`, `$`, `€`, `£`, `¥`) with quick presets (₹10,000, ₹25,000, ₹50,000, ₹1,00,000+) and custom amount.
- **STEP 04 — Travel Style**: Solo, Couple, Family, Friends.
- **STEP 05 — Travel Pace**: Relaxed (fewer places, more downtime), Balanced (curated mix), or Packed (high-energy sightseeing).
- **STEP 06 — Interests**: Food, Beaches, Adventure, Culture, History, Shopping, Nature, Nightlife, Photography.
- **STEP 07 — Special Preferences**: Optional note (e.g. *"Vegetarian"*, *"Prefer quiet places"*, *"Traveling with parents"*).

### 4. Results Experience
- **Trip Overview**: Destination, Dates, Duration, Budget, Style, and Pace.
- **Your Journey**: Vertical day-by-day timeline with Morning, Afternoon, Evening, Food suggestions, and Estimated daily cost.
- **Curated Sections**:
  - Accommodation suggestions
  - Food recommendations
  - Places to explore
  - Activities & experiences
  - Transportation options
  - Budget breakdown (compact, clean summary)
  - Useful travel tips
- **Regenerate Plan**: Re-runs the generator using the same preferences.
- **Plan Another Trip**: Returns smoothly to the planner.
- **Copy & Print**: One-click clipboard copy or PDF print.

---

## 🔒 API Security & Configuration

1. **Environment Variable**: Set `VITE_OPENAI_API_KEY` in `.env` (refer to `.env.example`).
2. **Runtime Dialog**: Click the **API** button in the navbar to test a key directly in browser `localStorage`.
3. **Autonomous Dynamic Planner**: When no key is configured, VoyageAI automatically generates tailored, realistic itineraries for any destination.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```
