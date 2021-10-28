
   // Confirmation de la commande
function addConfirmationOrder() {
    const confirmationId = localStorage.getItem("responseId");
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.innerHTML =  confirmationId;
};




////////////////////////////////////APPEL DES FONCTIONS/////////////////////////////////////////////////
addConfirmationOrder()

localStorage.removeItem('contact');
localStorage.removeItem('productSave');
localStorage.removeItem('orderId');