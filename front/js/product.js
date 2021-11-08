const queryString_url_id = window.location.search;


//Extraire l'id du produit à afficher

const SearchParams = new URLSearchParams(queryString_url_id);
console.log(SearchParams);

const eId = SearchParams.get("id")
console.log(eId);

let response = fetch('http://localhost:3000/api/products/' + eId)
    .then((response) => {
        return response.json();
    })
console.log(response);


const description = document.getElementById("description")
const nomProduct = document.getElementById("title")
const price = document.getElementById("price")
const select = document.querySelector("#colors")
const itemContent = document.getElementsByClassName('item__img');




response.then(function (data) {



    description.innerHTML = data.description
    nomProduct.innerHTML = data.name
    price.innerHTML = data.price

    let option

    for (let i of data.colors) {
        option = document.createElement('option');
        option.text = i;
        option.value = i;
        select.appendChild(option);

    }





    var image = new Image();
    image.src = data.imageUrl;
    itemContent[0].appendChild(image);
    console.log(itemContent);
    itemContent.innerHTML += `<img src=${data.imageUrl} alt=${data.altTxt}>`;

    const idForm = document.querySelector("#colors")
    const btn_caddy = document.querySelector("#addToCart")
    const itemQuantity = document.querySelector("#quantity")


    btn_caddy.addEventListener("click", (event) => {
        event.preventDefault();
        if (itemQuantity.value > 0 && itemQuantity.value <= 100 && itemQuantity.value != 0 && idForm.value != 0) {


            const choiceform = idForm.value
            const choiceQuantity = itemQuantity.value

            let optionProduct = {
                id: eId,
                nameProduct: data.name,
                price: data.price,
                select: choiceform,
                quantity: choiceQuantity,
                image: data.imageUrl,
                color: data.colors

            }

            //------Enregister les infos dans le local storage--------

            let productSave = JSON.parse(localStorage.getItem("itemCaddy"));

            const popupConfirm = () => {
                if (window.confirm(`Votre commande de ${choiceQuantity} ${data.name} ${choiceform} a été ajouté au panier
            Pour continuer vos achats, cliquez sur OK`)) {
                    
                }
            }

            if (productSave) {
                const resultFind = productSave.find((el) => el.id === eId && el.select === idForm.value);

                //Si le produit commandé est déjà dans le panier
                if (resultFind) {
                    let newQuantity =
                        parseInt(resultFind.quantity) + parseInt(itemQuantity.value);
                    resultFind.quantity = newQuantity;
                    localStorage.setItem("itemCaddy", JSON.stringify(productSave));
                    console.table(productSave);
                    popupConfirm();
                    //Si le produit commandé n'est pas dans le panier
                } else {

                    productSave.push(optionProduct);
                    console.table(productSave);
                    localStorage.setItem("itemCaddy", JSON.stringify(productSave));
                    popupConfirm();
                }
                //Si le panier est vide
            } else {
                productSave = [];
                productSave.push(optionProduct);
                console.table(productSave);
                localStorage.setItem("itemCaddy", JSON.stringify(productSave));
                popupConfirm();
            };

        }


    });


});