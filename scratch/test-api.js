
async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/records');
    const data = await res.json();
    console.log('API GET /api/records:', data);
  } catch (e) {
    console.error('API Test Error:', e);
  }
}

testApi();
