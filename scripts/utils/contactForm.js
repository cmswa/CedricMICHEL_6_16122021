// Modal Contact 

const modal = document.getElementById('background-modal');

//ouverture de la modal
function displayModal() {
    modal.style.display = 'block';
    document.body.style.overflowY = 'hidden';
}

//fermeture de la modal 
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflowY = 'visible';
}

//evenement fermeture modal via bouton échap
document.addEventListener('keydown', echapKey);

function echapKey(e) {
    if (e.code == 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflowY = 'visible';
    }
}

//soumettre le formulaire
document.querySelector('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log('Contact Utilisateur: ', data); // demandé dans le projet
    this.closeModal();
    document.body.style.overflowY = 'visible';
});
