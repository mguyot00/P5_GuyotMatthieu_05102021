// Affichage de l'id de la commande
function addConfirmationOrder() {
    const confirmationId = localStorage.getItem("responseId");
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.innerHTML =  confirmationId;
};
console.log("responseId");
function removeKey(key){

localStorage.removeItem(key);
}

addConfirmationOrder();

//Suppression des éléments du localStorage
removeKey("responseId");
removeKey("itemCaddy");


