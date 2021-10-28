let productSave = JSON.parse(localStorage.getItem("itemCaddy"));



const itemSave = document.querySelector("#cart__items");;


if (productSave === null || productSave == 0) {
  const caddyNull = `
    <div class "containerCaddyNull">
    <div> Le panier est vide</div>
    </div>`

  itemSave.innerHTML = caddyNull;
} else {
  let structureCaddy = [];
  for (j = 0; j < productSave.length; j++) {

    structureCaddy = structureCaddy + `
       
          <article class="cart__item" data-id="{product-ID}">  
              <div class="cart__item__img">
              <img src="${productSave[j].image}" alt="Photographie d'un canapé">
              </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${productSave[j].nameProduct}</h2>
                    
                    <p>${productSave[j].price}€</p>
                  </div>
                  <p>${productSave[j].select}</p>
                  <div class="cart__item__content__settings">
                  
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productSave[j].quantity}">
                      </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
        `;
  }

  if (j == productSave.length) {
    itemSave.innerHTML = structureCaddy;

  }
}

let totalItem = document.querySelector("#totalPrice")


//-------------Bouton supprimer----------

let deleteItem = document.querySelectorAll(".deleteItem");
console.log(deleteItem);

for (let k = 0; k < deleteItem.length; k++) {
  deleteItem[k].addEventListener("click", (event) => {
    event.preventDefault();

    let idDelete = productSave[k].id;
    console.log(idDelete);


    productSave = productSave.filter((el) => el.id !== idDelete);
    console.log(productSave);
    localStorage.setItem("itemCaddy", JSON.stringify(productSave));

    alert("Ce produit a été supprimer du panier")
    window.location.href = "cart.html";


  });

}

//---------total quantité--------

let totalquantity = document.querySelector("#totalQuantity");

let totalProduct = []

for (let p = 0; p < productSave.length; p++) {
  let quantityItemsCaddy = productSave[p].quantity;

  totalProduct.push(quantityItemsCaddy)


  console.log(totalProduct);
}

const calcul = (accumulator, currentValue) => accumulator + currentValue;
const totalQuantityItems = totalProduct.reduce(calcul);

console.log(totalQuantityItems);

totalquantity.innerHTML = totalQuantityItems;


//---------Montant total du panier--------

let total = document.querySelector("#totalPrice")

let totalItems = []

for (let t = 0; t < productSave.length; t++) {
  let priceItemsCaddy = productSave[t].price;

  totalItems.push(priceItemsCaddy)
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalItems.reduce(reducer, 0);

console.log(totalPrice);

total.innerHTML = totalPrice;


//----------Récuperation des données du formulaire----------

//-----Button formulaire-----

const btnOrder = document.querySelector("#order");


btnOrder.addEventListener("click", (e) => {
  e.preventDefault();
  const contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value

  }
 

  //------validation du formulaire--------
  const textAlert = (value) => {
    return `${value}: Veuillez bien remplir le formulaire`;
  }



  const regExFirstNameNameCity = (value) => {
    return (/^[A-Za-z]{2,20}$/.test(value))
  }

  const regExEmail = (value) => {
    return (/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(value));
  }

  const regExAddress = (value) => {
    return (/^[A-Za-z0-9\s]{5,50}$/.test(value));
  }



  function firstNameControl() {


    const firstNameVal = contact.firstName;

    if (regExFirstNameNameCity(firstNameVal)) {
      return true;

    } else {
      alert(textAlert("Prénom"))
      return false;
    }
  };


  function NameControl() {


    const nameVal = contact.lastName;

    if (regExFirstNameNameCity(nameVal)) {
      return true;

    } else {
      alert(textAlert("Nom"))
      return false;
    };
  }

  function cityControl() {


    const cityVal = contact.city;

    if (regExFirstNameNameCity(cityVal)) {
      return true;

    } else {
      alert(textAlert("Ville"))
      return false;
    };
  }


  function adressControl() {


    const addressVal = contact.address;

    if (regExAddress(addressVal)) {
      return true;

    } else {
      alert(textAlert("Adresse"))
      return false;
    };
  }

  function emailControl() {


    const EmailVal = contact.email;

    if (regExEmail(EmailVal)) {
      return true;

    } else {
      alert(textAlert("email"))
      return false;
    };
  }




  if (firstNameControl() && NameControl() && cityControl() && adressControl() && emailControl()) {
    localStorage.setItem("formulaireValues", JSON.stringify(contact));
  } else {
    alert("Veuillez bien remplir le formulaire")
  }

  let products = [];
  for (let l = 0; l < productSave.length; l++) {
    let productId = productSave[l].id;
    products.push(productId)

  };


  const infoSend = {
    contact,
    products,
  }

  // envoie de l'objet "InfoSend" vers le serveur 

  let promise01 = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'content-type': "application/json"
    },
    mode: "cors",
    body: JSON.stringify(infoSend),
  });

  promise01.then(async (response) => {

    try {

      const content = await response.json();
      console.log(content);

      if (response.ok) {

        console.log('resultat.ok: ${response.ok}');

        console.log("Id de reponse");
        console.log(content.orderId);

        localStorage.setItem("responseId", content.orderId)

        window.location = "confirmation.html";

      } else {
        console.log('reponse du serveur: ${response.status');
        alert('Probléme avec le serveur: erreur ${response.status}')



      }

    } catch (e) {
      console.log(e);
    }
  });
});
