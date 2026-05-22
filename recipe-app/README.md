# My Recipe Book — Google Apps Script

A premium recipe book web app powered by Google Sheets.

## Setup

### 1. Find your Spreadsheet ID

Open your Google Sheet. The URL looks like:
```
https://docs.google.com/spreadsheets/d/1ABCdef123.../edit
```
Copy the long ID between `/d/` and `/edit`.

### 2. Paste it in Code.gs

Open `Code.gs` and replace the placeholder:
```js
const SPREADSHEET_ID = "1ABCdef123...";   // ← your ID here
```

This **hard-wires** the script to your sheet so it always loads the right data,
regardless of where you deploy from.

### 3. Deploy

1. Open **Extensions → Apps Script** in your sheet.
2. Paste `Code.gs` into the script editor (replace existing code).
3. Create a new HTML file named `Index` and paste the contents of `Index.html`.
4. Click **Deploy → New deployment → Web app**.
5. Set *Execute as*: **Me**, *Who has access*: **Anyone** (or restrict as needed).
6. Copy the web app URL and open it.

## Sheet Structure

| Sheet name    | Required columns |
|---------------|-----------------|
| `Recipes`     | `RecipeID`, `Recipe Name`, `Category`, `Description`, `Prep Time`, `Cook Time`, `Total Time`, `Servings`, `Recipe Image` (URL, optional) |
| `Ingredients` | `IngredientID`, `RecipeID`, `Ingredient`, `Checked` |
| `RecipeSteps` | `RecipeID`, `Step Number`, `Instruction` |

## Features

- 🔍 Instant search across name, category, and description  
- 🏷️ Category filter pills  
- 📋 Ingredient checklist with **progress bar** — persists to the sheet  
- ↺ Reset checklist button  
- ⏱ Prep / cook / total time + servings chips  
- 📸 Recipe photos (just drop an image URL in the sheet)  
- 🔗 "Open Sheet" link in the header  
- Skeleton loading state  
- Toast notifications  
- Fully mobile-responsive  
