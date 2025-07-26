// Minimal test: Reviewing self-nominate API
const fetch = require('node-fetch');

async function run() {
  const res = await fetch('http://localhost:3000/api/reviewer/1/self-nominate', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  console.log('Test self-nominate:', data.ok === true);
}

if (require.main === module) run();