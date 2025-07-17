export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const backendUrl = 'https://<your-backend-subdomain>.vercel.app/api/forecast';
  const backendRes = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: /* history data to send */ [], periods: 3 })
  });
  const data = await backendRes.json();
  res.status(200).json(data);
}
