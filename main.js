const fs = require("fs");

const fileProducts = "./fileProducts.json";

const arraryProducts = [
    {title: "Producto 1",description: "Descripción 1",price: 100,img: "sin img",code: "COD1",stock: 50},
    {title: "Producto 2",description: "Descripción 2",price: 200,img: "sin img",code: "COD2", stock: 70},
    {title: "Producto 3",description: "Descripción 3",price: 300,img: "sin img",code: "COD3",stock: 85},
    {title: "Producto 4",description: "Descripción 4",price: 400,img: "sin img",code: "COD4",stock: 90},
    {title: "Producto 5",description: "Descripción 5",price: 500,img: "sin img",code: "COD5",stock: 100},
    {title: "Producto 6",description: "Descripción 6",price: 600,img: "sin img",code: "COD6",stock: 40},
    {title: "Producto 7",description: "Descripción 7",price: 700,img: "sin img",code: "COD7",stock: 80},
    {title: "Producto 8",description: "Descripción 8",price: 800,img: "sin img",code: "COD8",stock: 95},
    {title: "Producto 9",description: "Descripción 9",price: 900,img: "sin img",code: "COD9",stock: 30},
    {title: "Producto 10",description: "Descripción 10",price: 1000,img: "sin img",code: "COD10",stock: 60}
];

class ProductManager {

    static ultId = 0
    constructor() {
        this.products = [];
        this.path = fileProducts;
    }

    getProducts(){
        return this.products; 
    }

    addProduct(title, description, price, img, code, stock){

        if(!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }


        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico.");
            return; 
        }
        
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price, 
            img,
            code,
            stock
        }

        this.products.push(newProduct);
        this.saveProducts();
    }

    getProductById(id){
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado.");
        } else {
            console.log("Producto encontrado.", product);
        }
    }

    saveProducts() {
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), err => {
            if (err) {
                console.error('Error al guardar los productos:', err);
            }
        });
    }

    updateProduct(id, updatedFields) {
        const i = this.products.findIndex(product => product.id === id);
        if (i !== -1) {
            this.products[i] = { ...this.products[i], ...updatedFields };
            this.saveProducts(); 
        } else {
            console.log("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts(); 
    }
}

/* 
//Testing: desafio 1
//1) Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager(); 

//2) Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(manager.getProducts());

//3) Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

manager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "123456", 25);

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

//4)Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

manager.addProduct("Greenfort", "producto natural", 10000, "sin imagen", "234567", 50);

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

manager.addProduct("Varifort", "Para las varices", 6000, "sin imagen", "345678", 90);

console.log(manager.getProducts());

//5)Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo


manager.getProductById(1);
manager.getProductById(20);

*/

const manager = new ProductManager(); 

//TESTING
//Primer llamada = arreglo vacio
console.log(manager.getProducts());

// Agrego productos y los muestro
for (const product of arraryProducts) {
    manager.addProduct(product.title, product.description, product.price, product.img, product.code, product.stock);
}
console.log(manager.getProducts());

//Validación de codigo repetido
manager.addProduct("Producto 1","Descripción 1", 100,"sin img","COD1", 50);

//Validación de campos faltantes
manager.addProduct("Descripción 1",100 ,"sin img","COD1",50);

//Buscamos productos por id
manager.getProductById(2);

//Producto no encontrado
manager.getProductById(11);

//Eliminamos algun producto y comprobamos si se elimino
manager.deleteProduct(2)
console.log(manager.getProducts());

//Eliminamos un producto que no existe
manager.deleteProduct(20)

// Editamos un producto (el 10) y comprobamos
manager.updateProduct(10, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 10000,
    img: "con img",
    code: "COD10",
    stock: 400
});
console.log(manager.getProducts());

//Editar un producto que no existe
manager.updateProduct(15, {
    title: "Producto 11",
    description: "Descripción del producto 11",
    price: 10000,
    img: "con img",
    code: "COD10",
    stock: 400
});