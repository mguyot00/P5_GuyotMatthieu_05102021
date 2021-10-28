
fetch('http://localhost:3000/api/products')
    .then( (response) => {
        return response.json();
    })
    .then( (data) => { 
        console.log(data);
        displayProduct(data)
    })
    .catch((error) => {
        console.log(error)
    });

//création de la fonction 'product' :
function displayProduct(product) {
    //création de la boucle 
    for(let i=0; i<product.length; i++) {
        console.log(product[i]);

        //création de la carte :
        let card = document.getElementById("items");
        card.innerHTML +=
            `<a href="./product.html?id=${product[i]._id}">
                <article>
                    <img src=${product[i].imageUrl} alt=${product[i].altTxt}>
                    <h3 class="productName">${product[i].name}</h3>
                    <p class="productDescription">${product[i].description}</p>
                </article>
            </a>`;
        console.log(card.innerHTML);
    }

};
    





 
  



   
 
 

