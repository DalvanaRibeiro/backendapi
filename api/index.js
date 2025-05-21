import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let produtos = [
  { id: 1, nome: "Notebook Gamer", preco: 5500, estoque: 5 },
  { id: 2, nome: "Mouse RGB", preco: 150, estoque: 20 },
  { id: 3, nome: "Teclado Mecânico", preco: 350, estoque: 15 }
];

// Rota inicial
app.get("/", (req, res) => {
  res.send("API da Loja de Informática");
});

// Listar todos os produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// Adicionar novo produto
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

// Deletar produto
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  produtos = produtos.filter(p => p.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
