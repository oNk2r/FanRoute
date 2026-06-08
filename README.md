# ⚽ FanRoute: FIFA World Cup 2026 Interactive Hub

**FanRoute** is a highly interactive web app to explore, track, and filter matches for the upcoming **FIFA World Cup 2026** (hosted across Canada, Mexico, and the USA from June 11 to July 19, 2026).

---

## 📅 Core Features

1. **Interactive Calendar Hub (`CalendarView.tsx`)**:
   - Renders a monthly grid view for **June** and **July 2026** customized for the World Cup bracket dates.
   - Highlights dates with matches scheduled for the user's selected teams and lists the scheduled matches in a details section when clicked.
   
2. **Personalized Team Filters (`TeamSelector.tsx`)**:
   - Sidebar list of all 48 qualified countries grouped by confederation (UEFA, CONMEBOL, CONCACAF, AFC, CAF, OFC).
   - Features **live search filtering** and options to toggle confederations or clear/select all countries.
   - Saves selections in `localStorage` to preserve filters on reload.

3. **Super Favorites (🌟)**:
   - Pin up to **3 Super Favorite** teams to make their matches stand out.
   - Matches featuring a Super Favorite team receive special green borders, pulsating star icons, and priority visibility.

4. **Timezone Converter & Live Hub Clock (`timezone.ts`, `App.tsx`)**:
   - Converts UTC kickoff times into the user's selected timezone (e.g., IST, EDT, BST, JST) on the fly.
   - Displays a live ticking clock in the header, synchronized to the mock tournament start date (`June 7, 2026`), letting you preview countdowns to fixtures as they approach.

5. **Tournament Countdowns (`countdown.ts`, `MatchCard.tsx`)**:
   - Calculates the exact time remaining until each fixture.
   - Automatically tags matches as **LIVE NOW** (during their estimated 2-hour playing window) or **Finished** as time progresses.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Client-Side Rendering)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4) with custom HSL neon emerald colors and theme configurations.
- **Icons**: Lucide React
- **Build Tool**: Vite 6

---