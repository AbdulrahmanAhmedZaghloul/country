# World Countries (Vite + React + Tailwind)

A fast React app to explore world countries and recent news. It uses REST Countries for country data, WorldNews API for headlines, and a clean Tailwind UI.

## Features
- Select a country from a searchable list
- Country info: flag, coat of arms, UN membership, independence
- Country facts: population, region, timezone, capital, start of week
- Map section with Google Maps link and an embedded capital map
- City News grid (WorldNews API) showing live headlines for the selected country
- Clickable world image opens a modal with a YouTube video
- Local hero images loaded from `src/assets/*`
- Axios for all HTTP calls, with a dedicated Rest Countries axios instance
- Native image lazy-loading and async decoding for better performance

## Tech Stack
- React 18 (Vite)
- Tailwind CSS
- Axios
- React Icons
- EmailJS (contact form)

## APIs
- REST Countries v3: `https://restcountries.com`
- WorldNews API: `https://api.worldnewsapi.com/search-news`

## Environment Variables
Create a `.env` file in the project root:
```env
VITE_WORLDNEWS_API_KEY=your_worldnews_api_key
```
Restart the dev server after creating or changing the `.env` file.

## Getting Started
1) Install dependencies
```bash
npm install
```
2) Run the dev server
```bash
npm run dev
```
Vite will print the local URL (for example `http://localhost:5173`).

3) Build for production
```bash
npm run build
```
4) Preview production build
```bash
npm run preview
```

## Project Structure (key files)
- `src/App.jsx`: Composition, selected country state, and page layout
- `src/pages/Home.jsx`: Hero slider, country selector, world modal video
- `src/components/InfoCountry.jsx`: Flag, coat of arms, UN membership, independence
- `src/components/DetailsCountry.jsx`: Population, region, start of week, timezone, capital (with background image)
- `src/components/Map.jsx`: Google Maps link and embedded capital map
- `src/components/CityNews.jsx`: WorldNews API integration (+ lazy-loaded images)
- `src/components/Contact.jsx`: EmailJS-based contact form
- `src/components/Navbar.jsx`: Top navigation
- `src/api/config.js`: Axios instance for REST Countries

## Axios Usage Examples
```js
import axios from "axios";

// REST Countries sample
const { data } = await axios.get(
  "https://restcountries.com/v3.1/all?fields=name,cca2"
);

// WorldNews sample
const { data: newsData } = await axios.get(
  "https://api.worldnewsapi.com/search-news",
  { params: { 'api-key': import.meta.env.VITE_WORLDNEWS_API_KEY, 'source-countries': 'JM', number: 4 } }
);
```

## Notes
- Place slider images in `src/assets/slide1.jpg`, `slide2.jpg`, `slide3.jpg`.
- The `DetailsCountry` section uses a background image from `src/assets/factsbg2.jpg`.
- To autoplay the modal video, add `&autoplay=1&mute=1` to the iframe URL in `Home.jsx`.

## License
This project is provided as-is for learning and demo purposes.