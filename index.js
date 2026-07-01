const express = require('express');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Set up authentication for Google Service Account credentials
const serviceAccountAuth = new JWT({
  email: 'your-service-account-email@project.iam.gserviceaccount.com',
  key: '-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet('', serviceAccountAuth);

// API Endpoints to handle user registration
app.post('/api/register', async (req, res) => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; // First sheet row array
  await sheet.addRow(req.body);
  res.json({ success: true, message: 'Row appended directly to Excel template!' });
});

app.listen(3000, () => console.log('Secure Backend serving on port 3000'));