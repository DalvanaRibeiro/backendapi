const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Caminho para o "banco de dados" (JSON)
const dbPath = path.join(__dirname, 'products.json');

// Função para ler o arquivo de produtos
const readProducts = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData);
};

// Endpoint para pegar todos os produtos
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// Endpoint para adicionar um produto
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  const products = readProducts();
  products.push(newProduct);

  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
