// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — paste your Google Sheet ID here once and the app always
// points to the right sheet, no matter which spreadsheet is "active".
//
// Find it in your sheet URL:
//   https://docs.google.com/spreadsheets/d/  <<<THIS PART>>>  /edit
// ─────────────────────────────────────────────────────────────────────────────
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";

// ─────────────────────────────────────────────────────────────────────────────
// Web app entry point
// ─────────────────────────────────────────────────────────────────────────────
function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("My Recipe Book")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function getSpreadsheet_() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "YOUR_SPREADSHEET_ID_HERE") {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  // Fallback: works when running directly from the bound sheet
  return SpreadsheetApp.getActiveSpreadsheet();
}

function sheetToObjects_(sheet) {
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(h => String(h).trim());
  return values
    .slice(1)
    .filter(row => row.some(cell => cell !== "" && cell !== null))
    .map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Main data loader
// ─────────────────────────────────────────────────────────────────────────────
function getRecipeAppData() {
  const ss = getSpreadsheet_();
  return {
    recipes:     sheetToObjects_(ss.getSheetByName("Recipes")),
    ingredients: sheetToObjects_(ss.getSheetByName("Ingredients")),
    steps:       sheetToObjects_(ss.getSheetByName("RecipeSteps")),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Ingredient checklist
// ─────────────────────────────────────────────────────────────────────────────
function updateIngredientChecked(ingredientId, checked) {
  const ss    = getSpreadsheet_();
  const sheet = ss.getSheetByName("Ingredients");
  const data  = sheet.getDataRange().getValues();
  const headers = data[0];

  const idCol      = headers.indexOf("IngredientID");
  const checkedCol = headers.indexOf("Checked");

  if (idCol === -1 || checkedCol === -1) {
    throw new Error("Sheet is missing an IngredientID or Checked column.");
  }

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(ingredientId)) {
      sheet.getRange(i + 1, checkedCol + 1).setValue(checked === true);
      return { success: true };
    }
  }

  throw new Error("Ingredient not found: " + ingredientId);
}

function resetRecipeIngredients(recipeId) {
  const ss    = getSpreadsheet_();
  const sheet = ss.getSheetByName("Ingredients");
  const data  = sheet.getDataRange().getValues();
  const headers = data[0];

  const recipeCol  = headers.indexOf("RecipeID");
  const checkedCol = headers.indexOf("Checked");

  if (recipeCol === -1 || checkedCol === -1) {
    throw new Error("Sheet is missing a RecipeID or Checked column.");
  }

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][recipeCol]) === String(recipeId)) {
      sheet.getRange(i + 1, checkedCol + 1).setValue(false);
    }
  }

  return { success: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Optional: returns the edit URL for the spreadsheet (shown as a link in app)
// ─────────────────────────────────────────────────────────────────────────────
function getSheetUrl() {
  return getSpreadsheet_().getUrl();
}
