import fs from "fs";

export class ProductManager {
    constructor() {
        this.path = "./ProductManager.json";
        this.products = [];
        this.leerJson();
    }

    leerJson = () => {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8");
            this.products = JSON.parse(data);
        }
    };

    guardarJson = () => {
        const data = JSON.stringify(this.products, null, 4);
        fs.writeFileSync(this.path, data);
    };

    addProduct = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        if (this.products.some((product) => product.code === code)) {
            console.log("El codigo ya esta en uso");
            return;
        }
        thumbnail = thumbnail || "Sin Imagen";

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push(product);
        this.guardarJson();
    };

    getProducts = () => {
        this.leerJson();
        return this.products;
    };

    getProductById = (id) => {
        this.leerJson();
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.log("No encontrado");
        }
        return product;
    };

    updateProduct = (id, productoActualizado) => {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            console.log("No encontrado");
            return;
        }
        this.products[index] = {
            ...this.products[index],
            ...productoActualizado,
        };
        this.guardarJson();
    };

    deleteProduct = (id) => {
        const index = this.products.findIndex((product) => product.id === id);
        if (index === -1) {
            console.log("No encontrado");
            return;
        }
        this.products.splice(index, 1);
        console.log("Producto Eliminado");
        this.guardarJson();
    };
}
