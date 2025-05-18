# mini-cypris

A minimal Angular application that lets you search and explore open-access research papers via the CORE API.  
Features include:

- **Boolean keyword search** (e.g. `drone AND (package OR delivery)`)  
- **Adjustable result limit**  
- **Interactive “Papers per Year” bar chart**  
- **Expandable details** with authors, dates, publisher, and download links  
- **Deep-link into individual paper metadata** via an “About” page  

---

## 🛠️ Tech Stack

- **Framework**: [Angular 16](https://angular.io/)  
- **UI Library**: Angular Material  
- **Charts**: ng2-charts (Chart.js)  
- **Language**: TypeScript (ES2023)  
- **Build Tool**: Angular CLI (v16.x)  
- **Styling**: CSS / Angular component styles  

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+  
- [Angular CLI](https://github.com/angular/angular-cli) v16.x  
- A **CORE API key** — sign up or read docs at [https://api.core.ac.uk/docs/v3](https://api.core.ac.uk/docs/v3)

> **Security note**: your API key should go into `src/environments/environment.ts`.  
> We do _not_ commit that file. Create it yourself:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  coreApiBaseUrl: 'https://api.core.ac.uk/v3/search/works',
  coreApiKey: 'YOUR_API_KEY'
};
```


## Installation
1. Clone this repo
```
git clone https://github.com/your-username/mini-cypris.git
cd mini-cypris

```

2. Install dependencies
```
npm install
```

3. Add your environment.ts (see above)

4. Serve the app
```
ng serve
```

Navigate to http://localhost:4200 in your browser.

## Available Scripts
`ng serve` — start dev server

`ng build` — compile production build to dist/

`ng test` — run unit tests

`ng lint` — run linter

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/          # Landing page with intro + <app-search>
│   │   ├── nav/           # Global toolbar (logo + name)
│   │   ├── search/        # Search input + limit box
│   │   ├── results/       # List of papers + bar chart
│   │   └── info/          # Detailed view for a single paper
│   ├── models/            # TypeScript interfaces
│   ├── services/          # CORE API integration
│   ├── app-routing.module.ts
│   └── app.module.ts
├── assets/                # static assets (logo, default thumbnail)
└── environments/          # environment.ts excluded from repo
```
