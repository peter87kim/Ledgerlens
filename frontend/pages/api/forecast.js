export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Sample 12 months of history
  const history = [
    { ds: '2023-01-31', y: 2498.16 },
    { ds: '2023-02-28', y: 4802.86 },
    { ds: '2023-03-31', y: 3927.98 },
    { ds: '2023-04-30', y: 3394.63 },
    { ds: '2023-05-31', y: 1624.07 },
    { ds: '2023-06-30', y: 1623.98 },
    { ds: '2023-07-31', y: 1232.33 },
    { ds: '2023-08-31', y: 4464.70 },
    { ds: '2023-09-30', y: 3404.46 },
    { ds: '2023-10-31', y: 3832.29 },
    { ds: '2023-11-30', y: 1082.34 },
    { ds: '2023-12-31', y: 4879.64 }
  ];

  // 2. Call your backend forecast endpoint
  const backendUrl = 'https://ledgerlens-backend.vercel.app/api/forecast';
  const backendRes = await fetch(backendUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: history, periods: 3 })
  });
  const data = await backendRes.json();

  // 3. Return the result to your frontend page
  return res.status(200).json(data);
}
