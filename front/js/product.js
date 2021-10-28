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
        event.preventDefault()


        const choiceform = idForm.value
        const choiceQuantity = itemQuantity.value

        let optionProduct = {
            id: eId,
            nameProduct: data.name,
            price: (data.price * choiceQuantity),
            select: choiceform,
            quantity: choiceQuantity,
            image: data.imageUrl,
            color: data.colors

        }




        //------Enregister les infos dans le local storage--------

        let productSave = JSON.parse(localStorage.getItem("itemCaddy"));



        const addProduct = () => {
            productSave.push(optionProduct);
            localStorage.setItem("itemCaddy", JSON.stringify(productSave))
        };

        if (productSave) {

            addProduct();

        } else {
            productSave = [];
            addProduct();


            /*const updateItem = productSave.filter((el) => el.id == optionProduct.id && el.color == optionProduct.color)
            if (updateItem != null) {
                updateProduct();

            } else {
                productSave = [];
                addProduct();
            }*/


        }
     


        /*$: updateProduct = () => {

            let productUpdate = [];

            for (let item in productSave) {

                if (item.id == optionProduct.id && item.color == optionProduct.color) {
                    item.quantity = optionProduct.quantity + item.quantity
                }

                productUpdate.push(item)
            }
            console.log(productUpdate);
            localStorage.setItem("itemCaddy", JSON.stringify(productUpdate))
        };*/



    });

});