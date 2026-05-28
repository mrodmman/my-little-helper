const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY. PowerShell: $env:RESEND_API_KEY="re_xxx" then node publish-all.js');
  process.exit(1);
}

const templates = [
  { id: 'f26e99f7-212c-484e-9576-988a644fe0e8', name: 'kv-welcome-01' },
  { id: '62d59869-87dd-43ee-ab97-e02f0cdd57f5', name: 'kv-welcome-02' },
  { id: '72c3879e-1bcf-405e-9ee9-287efe08c095', name: 'kv-welcome-03' },
  { id: '5cab1bbc-62d6-422a-a4c4-b8c8e3877e2a', name: 'kv-welcome-04' },
  { id: '0b242f65-9059-40a5-8d9d-e661da424963', name: 'kv-welcome-05' },
  { id: '7795a340-8ed0-4a4f-a814-a5667d23721c', name: 'kv-nurture-01' },
  { id: '396d2876-d6e0-428f-b810-5e5489d851e7', name: 'kv-nurture-02' },
  { id: 'be848a11-9689-4e37-8d21-7097acd89fae', name: 'kv-nurture-03' },
  { id: '0740acc2-2cb4-4bc4-83de-3ed004abafa8', name: 'kv-nurture-04' },
  { id: '018c683f-f4f3-4028-a983-c9d9ce874568', name: 'kv-nurture-05' },
  { id: 'be623ad2-0add-4365-b193-4d7cdd5e2e67', name: 'kv-sales-01' },
  { id: 'fa608ce3-ddb1-477e-93dd-80314b36a694', name: 'kv-sales-02' },
  { id: '78a46c87-2dc7-4ac3-987a-74e9353a8b6b', name: 'kv-sales-03' },
  { id: 'e16018a4-6d58-48ba-aa0a-00353e518d39', name: 'kv-sales-04' },
  { id: 'e6ad750c-638d-49d6-8f5c-c8b7b69aa50a', name: 'kv-sales-05' }
];

async function publishAll() {
  console.log(`Publishing ${templates.length} Resend templates...\n`);
  let ok = 0;
  let fail = 0;

  for (const t of templates) {
    try {
      const response = await fetch(`https://api.resend.com/templates/${t.id}/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        fail++;
        console.log(`✗ ${t.name} — ${data.message || response.status}`);
      } else {
        ok++;
        console.log(`✓ ${t.name} — published`);
      }

      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      fail++;
      console.log(`✗ ${t.name} — ${err.message}`);
    }
  }

  console.log(`\nDone. Published: ${ok}. Failed: ${fail}.`);
}

publishAll();
