function noItems() {

  if (productSave == null || productSave == 0) {
    console.log(" Votre panier est vide");
    alert("Votre panier est vide")

  } else {
    console.log("true");
    return true;
  }

}

let productSave = JSON.parse(localStorage.getItem("itemCaddy"));

const itemSave = document.querySelector("#cart__items");;


if (productSave === null || productSave == 0) {
  const caddyNull = `
    <div class "containerCaddyNull">
    <div> Votre panier est vide</div>
    </div>`

  itemSave.innerHTML = caddyNull;
} else {
  let structureCaddy = [];
  for (j = 0; j < productSave.length; j++) {

    structureCaddy = structureCaddy + `
       
          <article class="cart__item" data-id="{product-ID}">  
              <div class="cart__item__img">
              <img src="${productSave[j].image}" alt="${productSave[j].altTxt}">
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
    let colorDelete = productSave[k].select;
    console.log(idDelete);


    productSave = productSave.filter((el) => el.id !== idDelete || el.select !== colorDelete );
    console.log(productSave);
    localStorage.setItem("itemCaddy", JSON.stringify(productSave));

    alert("Ce produit a été supprimer du panier")
    location.reload();


  });

}

function getTotals(){

  // Récupération du total des quantités
  var elemsQtt = document.getElementsByClassName('itemQuantity');
  var myLength = elemsQtt.length,
  totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
      totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Récupération du prix total
  totalPrice = 0;

  for (var i = 0; i < myLength; ++i) {
      totalPrice += (elemsQtt[i].valueAsNumber * productSave[i].price);
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++){
      qttModif[k].addEventListener("change" , (event) => {
          event.preventDefault();

          //Selection de l'element à modifier en fonction de son id ET sa couleur
          let quantityModif = productSave[k].quantity;
          let qttModifValue = qttModif[k].valueAsNumber;
          
          const resultFind = productSave.find((el) => el.qttModifValue !== quantityModif);

          resultFind.quantity = qttModifValue;
          productSave[k].quantity = resultFind.quantity;

          localStorage.setItem("itemCaddy", JSON.stringify(productSave));
      
          // refresh rapide
          location.reload();
      })
  }
}
modifyQtt();



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

  
  let products = [];

  if(noItems()== false) {
  for (let l = 0; l < productSave.length; l++) {noItems()
    let productId = productSave[l].id;
    products.push(productId)

  }
  };
  const infoSend = {
    contact,
    products,
  }




  if (firstNameControl() && NameControl() && cityControl() && adressControl() && emailControl() && noItems()) {
    localStorage.setItem("contact", JSON.stringify(contact));


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
          console.log("responseId");
        } else {
          console.log('reponse du serveur: ${response.status');
          alert('Probléme avec le serveur: erreur ${response.status}');



        }

      } catch (e) {
        console.log(e);
      }
    });

  } 


});
