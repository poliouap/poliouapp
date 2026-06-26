const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/health', (req, res) => {
  res.status(200).send('está funcionando');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
