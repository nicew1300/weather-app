# Weather App

## Description

Weather App project from The Odin Project Full Stack JavaScript course. Built using HTML, CSS, and JavaScript modules with Webpack for bundling and dependency management. This project focused on asynchronous JavaScript patterns and real-world API integration by fetching live forecast data from the Visual Crossing Weather API.

Compared to earlier DOM projects, this one required more complex data flow: handling user input, performing async requests, managing loading/error states, mapping API responses into display-ready UI data, and keeping the interface responsive while switching units and rendering multi-day forecast cards.

## Key Features

- Search weather by city using live API data.
- Dynamic weather rendering for current conditions and a five-day forecast.
- Temperature unit switcher (C/F) with UI state updates.
- Dynamic weather icon mapping based on API icon identifiers.
- Error handling for invalid city input or failed requests.
- Responsive layout using CSS Grid and Flexbox.
- Custom visual styling including gradient sky background, glow effects, and interactive UI transitions.

## Learning Outcomes

- Built confidence using asynchronous JavaScript with `fetch`, `async/await`, and Promise-based workflows.
- Practiced handling API response objects and transforming nested data into clean UI models.
- Improved understanding of state-driven UI behavior (search state, unit state, rendered state).
- Learned practical error handling patterns for user-facing async apps.
- Improved module organization by separating API logic and DOM rendering responsibilities.
- Strengthened CSS layout and component styling skills for a more polished frontend.

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Webpack
- npm
- Visual Crossing Weather API

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Create production build:

```bash
npm run build
```

## Deploy To GitHub Pages

1. Push your latest code to `main`.

2. Run deploy:

```bash
npm run deploy
```

This builds the project and publishes the `dist` folder to the `gh-pages` branch using the `gh-pages` package.

3. In GitHub repository settings:

- Go to **Settings -> Pages**.
- Under **Build and deployment**, choose **Deploy from a branch**.
- Set branch to **gh-pages** and folder to **/(root)**.
- Save.

4. Wait about 1-3 minutes for the first publish. Your site will be available at:

`https://<your-username>.github.io/<your-repo-name>/`

### Notes

- If `npm run deploy` says there is no upstream for `main`, run:

```bash
git push -u origin main
```

- On the first successful deploy, the `gh-pages` branch is created automatically.

- If GitHub Pages still shows 404, verify that the project name in the URL exactly matches your repository name.
