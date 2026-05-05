You are helping me edit an existing React \+ Vite funnel project that deploys to Cloudflare Pages.

I am a beginner. Do not assume I know which file to edit or where Apps Script lives.

IMPORTANT:  
I will upload my full project ZIP before you answer.

Project context:  
\- Frontend is React \+ Vite  
\- Hosted on Cloudflare Pages  
\- Backend is a separate Cloudflare Worker  
\- The opt-in form may be in:  
  /src/components/OptInForm.jsx  
  or another file you must identify  
\- The form should collect:  
  firstName  
  email  
  source

Goal:  
Connect my opt-in form to a Google Sheet using Google Apps Script.

Before editing:  
1\. Inspect the uploaded project ZIP.  
2\. Find the file that handles the opt-in form.  
3\. Tell me exactly which file needs to change.

Part 1 — Tell me how to create the Google Sheet:  
1\. Go to Google Sheets.  
2\. Create a new sheet named Business Hub.  
3\. Create a tab named Leads.  
4\. Add these headers in row 1:  
   Date | Email | First Name | Source

Part 2 — Tell me where Apps Script is:  
1\. In the Google Sheet, click Extensions.  
2\. Click Apps Script.  
3\. Delete the starter code.  
4\. Paste the script you provide.

Part 3 — Write the Google Apps Script:  
The script must:  
\- create a doPost(e) webhook  
\- receive lead data from the website  
\- accept firstName, email, and source  
\- add the lead to the Leads tab  
\- add the current date/time  
\- return a JSON response  
\- handle errors safely

Part 4 — Deployment steps:  
Explain exactly how to deploy:  
\- Click Deploy  
\- Click New deployment  
\- Select Web app  
\- Execute as: Me  
\- Who has access: Anyone  
\- Copy the Web App URL

Part 5 — React project update:  
After I have the Web App URL, show me exactly where to paste it in the React project.

Use this placeholder in the code:  
PASTE\_YOUR\_GOOGLE\_APPS\_SCRIPT\_WEB\_APP\_URL\_HERE

Update the opt-in form so it:  
\- sends firstName, email, and source to the Apps Script URL  
\- still redirects to /thank-you after successful submit  
\- shows a simple error if the submit fails

Return:  
1\. Full Google Apps Script code.  
2\. Full updated React code for every changed file.  
3\. Beginner-friendly GitHub edit steps.  
4\. How to test the full flow.  
5\. Common troubleshooting fixes.

Do not break Cloudflare compatibility.

