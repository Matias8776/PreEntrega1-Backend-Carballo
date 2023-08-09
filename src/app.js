import express from "express";
import { ProductManager } from "../ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager();

app.get("/", (req, res) => {
    res.send("Servidor ON");
});

app.get("/products", (req, res) => {
    const products = productManager.getProducts();
    const limit = +req.query.limit;
    let result = products;

    if (limit) {
        result = products.slice(0, limit);
    }

    res.send(result);
});

app.get("/products/:pid", (req, res) => {
    const products = productManager.getProducts();
    const pid = +req.params.pid;
    let product = products.find((product) => product.id === pid);

    if (!product) {
        res.send(`No existe el producto con el id ${pid}`);
        return;
    }

    res.send(product);
});

app.listen(8080, () => {
    console.log("Servidor en puerto 8080");
});
