# mini-cypris

A minimal Angular application that lets you search and explore open-access research papers via the CORE API.  
Features include:

1. **Search** millions of open-access research papers using Boolean keyword queries  
2. **Limit** the number of returned results for quick exploration  
3. **Drill down** into individual paper metadata—authors, dates, publisher, abstract, download links  
4. **Visualize** publication trends with an interactive “Papers per Year” bar chart  
5. **Aggregate** counts by year, author, data provider, document type, language, publisher, and more  
6. **Navigate** directly to a detailed “About” page for each paper  


---

## Tech Stack

- **Framework**: [Angular 16](https://angular.io/)  
- **UI Library**: Angular Material  
- **Charts**: ng2-charts (Chart.js)  
- **Language**: TypeScript (ES2023)  
- **Build Tool**: Angular CLI (v16.x)  
- **Styling**: CSS / Angular component styles  

---

## Getting Started

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
git clone https://github.com/jaswantg98/mini-Cypris.git
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

## How To Use
Once the app is running at http://localhost:4200, follow these steps to explore open-access research papers via the CORE API.

1. Choose a Search Mode
On the Home Page, use the dropdown to select one of the two modes:
Search Papers – Search using Boolean keyword queries with optional filters.
Aggregation Search – Perform group-based aggregation on search results with visual trends.

2. Search Papers Mode
Enter a Search Query in the text box (e.g., medicines, (drone AND (package OR delivery)))
Optional: Set a limit on number of results (default: 10)
Filters Available:
Title, Authors, ID, Year
If no filter is selected, search is performed across all fields.
Click Search to view results.

Error Handling:
Empty query: A popup prompts you to enter valid input.
No results: A message is shown if the query returns nothing.

3. Aggregation Search Mode
Enter a Keyword (e.g., drones)
Select one or more Group By fields:
yearPublished (default), authors, dataProvider, documentType, publishedDate, updatedDate, language, publisher, fieldOfStudy
Click Aggregate to fetch results.
A bar chart will be displayed showing aggregated trends based on the selected groupings.

Error Handling:
Same as in Search Papers: empty input prompts a message, and no results are handled gracefully.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/               # Landing page + mode selector
│   │   ├── nav/                # Global toolbar (logo + name)
│   │   ├── search/             # Classic search UI
│   │   ├── aggregate-search/   # Aggregation-search UI
│   │   ├── results/            # List of papers + bar chart
│   │   ├── aggregate-result/   # Aggregation results + charts
│   │   └── info/               # Detailed view for a single paper
│   ├── models/                 # TypeScript interfaces
│   ├── services/               # CORE API integration
│   ├── app-routing.module.ts
│   └── app.module.ts
├── assets/                     # static assets (logo, default thumbnail)
└── environments/               # environment.ts files (not committed)
```

