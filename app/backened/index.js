import qr from 'qr-image';
import express from 'express'
import cors from 'cors';
import { Buffer } from 'buffer';

const app = express()
const port = 5000

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from back')
})

app.post('/api/generate-qr', (req, res) => {
  const { url } = req.body
  console.log("Received URL: ", url);

  // Creating the QR code as a PNG buffer
  const qr_png = qr.imageSync(url, { type: 'png' });

  // Convert the PNG buffer to Base64
  const qr_base64 = Buffer.from(qr_png).toString('base64');

  // Log the base64 string for verification
  // console.log("Generated QR Base64: ", qr_base64);

  // Send the Base64 image string back to the frontend
  res.json({ qrCode: `data:image/png;base64,${qr_base64}` });
})


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})