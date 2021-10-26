const clickButton = document.querySelectorAll(".btn");
const tbody = document.querySelector(".tbody")
let carrito = [];


/*------------------------------------------BOTON AGREGAR---------------------------------------*/

clickButton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem)
})

function addToCarritoItem(e) {
    const button = e.target;
    const item = button.closest(".card");
    const itemTitle = item.querySelector(".card-title").textContent;
    const itemPrice = item.querySelector(".precio").textContent;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        cantidad: 1
    }

    addItemCarrito(newItem)
}

/*--------------------------------------------AGREGAR AL CARRITO ITEM--------------------------------------*/

function addItemCarrito(newItem) {
    const inputElemento = tbody.getElementsByClassName(`input-element`)
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = inputElemento[i];
            inputValue.value++;
            carritoTotal();
            return null;
        }
    }
    carrito.push(newItem);
    renderCarrito()
}

/*------------------------------ RENDERIZAR CARRITO -----------------------------*/

function renderCarrito() {
    tbody.innerHTML = "";
    carrito.map(item => {
        const tr = document.createElement("tr");
        tr.classList.add("itemCarrito");
        const content =
            ` 
        <td class= "table-productos">
            <h5 class="title"> ${item.title}</h5>
        </td>
        <td class="table-precio"><p>${item.precio}</p></td>
        <td class="table-cantidad"><input type="number" class="input-element" min="1" value=${item.cantidad}></td>
        <button class="delete"> X</button>`

        tr.innerHTML = content;
        tbody.append(tr);

        tr.querySelector(".delete").addEventListener("click", removeItem);
        tr.querySelector(".input-element").addEventListener("change", sumaCantidad)
    })
    carritoTotal()
}

/*-------------------------------------------SUMAR TOTAL------------------------------------*/

function carritoTotal() {
    let total = 0;
    const itemCarTotal = document.querySelector(".itemCartTotal");
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ``));
        total = total + precio * item.cantidad;
    })
    itemCarTotal.innerHTML = `Total $${total} `;
    addLocalStorage();
}

/*------------------------------------------ELIMINAR PRODUCTOS------------------------------------*/

function removeItem(e) {
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".itemCarrito");
    const title = tr.querySelector(".title").textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    tr.remove();
    carritoTotal()
}

/*------------------------INPUT SUMAR CANTIDAD ------------------*/

function sumaCantidad(e) {
    const sumaInput = e.target;
    const tr = sumaInput.closest(".itemCarrito");
    const title = tr.querySelector(".title").textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title.trim()) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal();
        }
    })
    console.log(carrito);
}

/*----------------------------------------LOCAL STORAGE------------------------------*/


function addLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem("carrito"));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}


/*----------------------------------------COMPRA FINAL------------------------------------*/

const botonComprar = document.querySelector(".btn-comprar");
botonComprar.addEventListener("click", comprar);

function comprar() {
    alert("Tu compra ha sido realizada");
    renderCarrito();
    tbody.remove();
    localStorage.clear();
    carritoTotal();
    const itemCarTotal = document.querySelector(".itemCartTotal");
    let total = 0;
    itemCarTotal.innerHTML = `Total $${total} `;

}