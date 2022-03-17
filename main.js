
const requestURL = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';

fetch(requestURL).then(res => res.json()).then(funcionInicio);

let tabla = document.getElementById("tablaPedido");
let cartasProductos = document.getElementById("productos");
let cant = [];
let opcionesTabla = document.getElementById("opciones");
let a = [];

function funcionInicio (productos){
    let categorias = document.getElementById("categorias");
    productos.forEach(cat => {
        let a = document.createElement("a");
        a.className = "nav-item nav-link";
        a.textContent = cat.name;

        categorias.appendChild(a);
    });






document.querySelectorAll(".nav-link").forEach( cate =>{
    cate.addEventListener("click", (event) =>{

    
    
    let categoria = event.target.text;

    let categoria2 = productos.find(producto => producto.name == categoria);

    while (cartasProductos.lastElementChild) {
        cartasProductos.removeChild(cartasProductos.lastElementChild);
      }

    categoria2.products.forEach( pro => {
        let divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        let divCard = document.createElement("div");
        divCard.setAttribute("style", "width: 18rem;");
        divCard.className = "card";
        let img = document.createElement("img");
        img.className = "card-img-top";
        img.setAttribute("src", pro.image);
        let title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = pro.name;
        let pPrice = document.createElement("p");
        pPrice.className = "card-text";
        pPrice.setAttribute("id", "itemPrice");
        pPrice.textContent = "$" + pro.price;
        let pDescription = document.createElement("p");
        pDescription.textContent = pro.description;
        pDescription.className = "card-text"  
        let buttomAdd = document.createElement("a");
        buttomAdd.className = "btn btn-warning btn-item";
        buttomAdd.setAttribute("type", "button");  
        buttomAdd.setAttribute("style", "background-color: red;"); 
        buttomAdd.textContent = "Add to card";

        buttomAdd.addEventListener("click", function() {
            countItems(pro, cant);
          });
          buttomAdd.addEventListener("click", function () {
            addItems(pro);
          });
  
        divCard.appendChild(img);

        divCardBody.appendChild(title);
        divCardBody.appendChild(pDescription);
        divCard.appendChild(pPrice);
        divCardBody.appendChild(buttomAdd);

        divCard.appendChild(divCardBody);
        
        cartasProductos.appendChild(divCard);

    }


    )

    tabla.innerHTML = "";
    opcionesTabla.innerHTML = "";
    });
});

  let tableHead = false;

  document.getElementById("carItems").addEventListener("click", function () {

    tabla.innerHTML = "";
    opcionesTabla.innerHTML = "";

    while (cartasProductos.lastElementChild) {
      cartasProductos.removeChild(cartasProductos.lastElementChild);
    }

    let title = document.getElementById("tituloCategoria");
    title.textContent = "Order detail";

    let table = document.createElement("table");
    table.className ="table table-striped";
        
    if(tableHead == false)
    {
      let tHead = document.createElement("thead");
      let trHead = document.createElement("tr");
      let nameColumns = ["Item", "Qty.", "Description", "Unit Price", "Amount", "Modify"];

      for (let i = 0; i < nameColumns.length; i++) {
        let trHd = document.createElement("th");
        trHd.textContent = nameColumns[i];
        trHd.setAttribute("scope", "col");
        trHead.appendChild(trHd);
      }

      tHead.appendChild(trHead);
      table.appendChild(tHead);
      tableHead = true;
    }

    let tBody = document.createElement("tbody");
    let spanTotal;
    let index = 0;
    let total = 0;

    cant.forEach(element => {

      let tr = document.createElement("tr");
      let thIndex = document.createElement("th");
      thIndex.setAttribute("scope", "col");
      thIndex.textContent = index;
      let tdQty = document.createElement("td");
      tdQty.textContent = element.cant;
      let tdDescription = document.createElement("td");
      tdDescription.textContent = element.food;
      let tdUnitPrice = document.createElement("td");
      tdUnitPrice.textContent = element.unitPrice;
      let tdAmount = document.createElement("td");
      tdAmount.textContent = element.amount;
      let tdButtons = document.createElement("td");

      let buttomAdd = document.createElement("a");
      buttomAdd.className = "btn btn-dark btn-row";
      buttomAdd.textContent = "+";
            
      buttomAdd.addEventListener("click", function() {
        tdQty.textContent = ++element.cant;
        tdAmount.textContent = element.cant * element.unitPrice;
        element.amount = element.cant * element.unitPrice;
        spanTotal.textContent = "Total $" + recalTotalA(cant);
      });

      let buttomLess = document.createElement("a");
      buttomLess.className = "btn btn-dark btn-row";
      buttomLess.textContent = "-";

      buttomLess.addEventListener("click", function() {
        tdQty.textContent = --element.cant;
        if(tdQty.textContent !== 0)
        {
          tdAmount.textContent = element.cant * element.unitPrice;
          element.amount = element.cant * element.unitPrice;
          spanTotal.textContent = "Total $" + recalTotalD(cant);
        }
        if(tdQty.textContent === "0")
        {
          tr.innerHTML = "";
          descountItems();
        }
      });

      tr.appendChild(thIndex);
      tr.appendChild(tdQty);
      tr.appendChild(tdDescription);
      tr.appendChild(tdUnitPrice);
      tr.appendChild(tdAmount);

      tdButtons.appendChild(buttomAdd);
      tdButtons.appendChild(buttomLess);

      tr.appendChild(tdButtons);
      tBody.appendChild(tr);
      total += element.amount;
      index++;
    });

    let divRow = document.createElement("div");
    divRow.className = "row";
    let divSpan = document.createElement("div");
    divSpan.className = "col";
    spanTotal = document.createElement("span");
    spanTotal.textContent = "Total: $" + total;
    spanTotal.setAttribute("id", "spanTotalItems");
    divSpan.appendChild(spanTotal);
    let divButtoms = document.createElement("div");
    divButtoms.className = "col d-flex justify-content-end";
    divButtoms.setAttribute("id", "divButtoms");
    let buttomCancel = document.createElement("button");
    buttomCancel.className = "btn btn-danger btn-order";
    buttomCancel.textContent = "Cancel";
    buttomCancel.setAttribute("data-target", "#cancelModal");
    buttomCancel.setAttribute("data-toggle", "modal");
    let buttomConfirm = document.createElement("a");
    buttomConfirm.className = "btn btn-light btn-order";
    buttomConfirm.textContent = "Confirm order";

    buttomConfirm.addEventListener("click", function () {
      let i = 1;
      let order = [];
      cant.forEach(element => {
        let objectOrder = {};
        objectOrder["item"] = i;
        objectOrder["quantity"] = element.cant;
        objectOrder["description"] = element.food;
        objectOrder["unitPrice"] = element.unitPrice;
        order.push(objectOrder);
      });
      console.log(order);
    });

    divButtoms.appendChild(buttomCancel);
    divButtoms.appendChild(buttomConfirm);

    divRow.appendChild(divSpan);
    divRow.appendChild(divButtoms);
        
    table.appendChild(tBody);
    tabla.appendChild(table);
    opcionesTabla.appendChild(divRow);

    document.getElementById("buttonYes").addEventListener("click", function() {
      tabla.innerHTML = "";
      opcionesTabla.innerHTML = "";
      cant = [];
      tableHead = false;
      clearCar();
    });
  });


}

let numItems = 0;
let itemCar = document.getElementById("itemsAdd");

function clearCar () {
  itemCar.textContent = (0) + " items";
  numItems = 0;
}

function countItems(item, cant) {
  itemCar.textContent = (numItems + 1) + " items";
  let encontrado = cant.find(elementFood =>  elementFood.food == item.name);
  if(encontrado === undefined)
  {
    let event = {};
    event["food"] = item.name;
    event["cant"] = 1;
    event["unitPrice"] = item.price;
    event["amount"] = item.price;
    cant.push(event);
  } else {
    encontrado.cant ++;
    encontrado.amount = encontrado.cant * encontrado.unitPrice;
  }
  numItems = numItems + 1;
}

function descountItems() {
  itemCar.textContent = (numItems - 1) + " items";
}

function addItems(item) {
  a.push(item);
}

function recalTotalA(cant) {
  let total = 0;
  cant.forEach(element => {
    total += element.amount;
  });
  return total;
}

function recalTotalD(cant) {
  let total = 0;
  cant.forEach(element => {
    total -= (-element.amount);
  });
  return total;
}