
const requestURL = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';

fetch(requestURL).then(res => res.json()).then(funcionInicio);

function funcionInicio (productos){
    let categorias = document.getElementById("categorias");
    productos.forEach(cat => {
        let a = document.createElement("a");
        a.className = "nav-item nav-link";
        a.textContent = cat.name;

        categorias.appendChild(a);
    })
}

document.querySelectorAll(".nav-link").forEach( cate =>{
    cate.addEventListener("click", (event) =>{

        let cartasProductos = document.getElementById("products");
    let categoria = event.target.text;

    let categorias = productos.find(producto => producto.name == categoria);

    categorias.productos.forEach( pro => {
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
        let pDescription = document.createElement("p");
        pDescription.textContent = pro.description;
        pDescription.className = "card-text"  
        let buttomAdd = document.createElement("a");
        buttomAdd.className = "btn btn-dark btn-item";
        buttomAdd.setAttribute("type", "button");  
        buttomAdd.textContent = "Add to card";

        divCard.appendChild(img);
        divCardBody.appendChild(title);
        divCardBody.appendChild(pDescription);
        divCardBody.appendChild(buttomAdd);

        divCard.appendChild(divCardBody);
        
        cartasProductos.appendChild(divCard);

    }


    )
    }
    )
}


)
let productos = document.getElementById("productos");

categorias.productos.forEach(pro =>
    {
        let divCard = document.createElement("div");
        divCard.className = "card cardItem";
    }
    )
function x() {
    fetch(requestURL)
    .then(res=>res.json())
    .then(acts => {acts.forEach(categoria =>
         
        console.log(categoria.name)
        
        );
    })
    }


x();