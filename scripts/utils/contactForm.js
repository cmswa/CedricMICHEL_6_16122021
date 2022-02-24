function displayModal() {
    const modal = document.getElementById('background-modal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('background-modal');
    modal.style.display = 'none';
}

//soumettre le formulaire
document.querySelector('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log("Contact Utilisateur: ", data);
    this.closeModal();
});

// var contactModal = document.forms.contact;
// console.log(contactModal);

// const submitModal = document.getElementById('submit-contact_button');
// submitModal.addEventListener('click', () => {
//     console.log(contactModal);
// })
