export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { industry, vibe } = req.body;
  // Use external placeholder URLs to avoid local asset uploads
  const placeholders = [
    'https://via.placeholder.com/150?text=Logo+1',
    'https://via.placeholder.com/150?text=Logo+2',
    'https://via.placeholder.com/150?text=Logo+3'
  ];
  res.status(200).json({ images: placeholders });
}
