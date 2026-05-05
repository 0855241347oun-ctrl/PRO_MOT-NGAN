
async function testPost() {
  try {
    const res = await fetch('http://localhost:3000/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        h1: "API Test Post",
        h2: "Sub",
        h3: "Meta",
        content1: "Content 1",
        content2: "Content 2"
      })
    });
    const data = await res.json();
    console.log('API POST /api/records:', data);
  } catch (e) {
    console.error('API Test Error:', e);
  }
}

testPost();
