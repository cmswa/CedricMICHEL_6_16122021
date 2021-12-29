//Mettre le code JavaScript lié à la page photographer.html
// const photographerBanner = document.querySelector(".photograph-header");
const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
console.log(urlParams);
const id = urlParams.get('id'); //récupère la valeur du champ id dans urlParams et la met dans la const id
console.log(id);


//profil
// async function getProfil() {
//     let profil = [];
//     await fetch('./data/photographers.json')
//         .then((response) => response.json())
//         .then((data) => {
//             profil = data.photographers.find(
//                 (photographer) => photographer.id === +id
//             );
//         });

//     return profil;
// }

async function getProfil() {
    let profil = [];
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    profil = data.photographers.find((photographer) => photographer.id === +id);
    return profil;
}

async function displayProfil(profil) {
    const profilSection = document.querySelector('.photograph-header');
    const profilModel = profilFactory(profil);
    const profilDOM = profilModel.getUserPageCardDOM();
    profilSection.appendChild(profilDOM);
}

// async function displayProfil(profils) {
//     const profilSection = document.querySelector(
//         '.photograph-header'
//     );

//     profils.forEach((profil) => {
//         const profilModel = profilFactory(profil);
//         const profilDOM = profilModel.getUserPageCardDOM();
//         profilSection.appendChild(profilDOM);
//     });
// }

async function init() {
    const profil = await getProfil();
    displayProfil(profil);
}

init();
