import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let produtos = [
  { id: 1, nome: 'Notebook Gamer', preco: 5500, estoque: 5 },
  { id: 2, nome: 'Mouse RGB', preco: 150, estoque: 20 },
  { id: 3, nome: 'Teclado Mecânico', preco: 350, estoque: 15 }
];

app.get("/", (req, res) => {
  res.send("API da Loja de Informática funcionando!");
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.post("/produtos", (req, res) => {
  const { nome, preco, estoque } = req.body;
  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco,
    estoque
  };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
