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

//profil
async function getProfil() {
    // let profil = [];
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.photographers.find((photographer) => photographer.id === +id);
}

async function displayProfil(profil) {
    const profilSection = document.querySelector('.photograph-header');
    const profilModel = profilFactory(profil);
    const profilDOM = profilModel.getUserPageCardDOM();
    profilSection.appendChild(profilDOM);
}

//medias
async function getMedias() {
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.media.filter((m) => m.photographerId === +id);
}

function insertMedias(medias, photographerName) {
    const content = document.querySelector('.photograph-content');
    //Réduit un tableau grâce à une fonction accumulatrice
    console.log(medias.reduce((acc, media) => +acc + +media.likes, 0)); //compteur total
    medias.forEach((media) => {
        const section = document.createElement('section');
        const title = document.createElement('h3');
        title.textContent = media.title;
        if (media.image) {
            const image = document.createElement('img');
            image.className = 'photograph-content__img';
            image.src = 'assets/medias/' + photographerName + '/' + media.image;
            image.alt = media.title;
            section.append(image);

            // lightbox-modal
            const lightbox = document.createElement('div');
            const titleLightbox = document.createElement('h3');
            titleLightbox.textContent = media.title;
            lightbox.id = 'lightbox-modal';
            document.body.appendChild(lightbox);
            console.log(lightbox);
            document.getElementById('lightbox-modal').style.display = 'none';

            const previous = document.createElement('i');
            previous.className = 'fas fa-chevron-left lightbox-modal__icons';
            previous.content = '\f053';
            lightbox.append(previous);

            const imageLightbox = document.createElement('img');
            imageLightbox.className = 'lightbox-modal__img';
            imageLightbox.src = 'assets/medias/' + photographerName + '/' + media.image;
            imageLightbox.alt = media.title;
            lightbox.append(imageLightbox);
            lightbox.append(titleLightbox);

            const next = document.createElement('i');
            next.className = 'fas fa-chevron-right lightbox-modal__icons';
            next.content = '\f054';
            lightbox.append(next);

            // launch lightbox event
            image.addEventListener('click', launchModal);
            // launch modal lightbox
            function launchModal() {
                header.style.display = 'none';
                main.style.display = 'none';
                lightbox.style.display = 'block';
              }

            let like = document.createElement('div');
            like.className = 'photograph-content__likes';
            const pLike = document.createElement('p');
            pLike.textContent = media.likes; // nombre de likes pour chaque photo

            like.append(pLike);
            title.append(like);

            const heart = document.createElement('i');
            heart.className = 'fas fa-heart photograph-content__hearts';
            heart.content = '\f004';
            like.append(heart);

            // ajout +1 compteur de like
            like = media.likes;
            heart.addEventListener('click', (e) => {
                const count = e.target.previousSibling; //previousSibling renvoie le nœud (node) précédant immédiatement le nœud courant dans la liste childNodes de son parent
                like++;
                const compteurTotalLike = document.getElementById('photograph-content__totalLikes')
                console.log(compteurTotalLike);
                let variableCompteurTotalLike = compteurTotalLike.textContent;
                variableCompteurTotalLike++;
                compteurTotalLike.textContent = variableCompteurTotalLike;
                console.log(variableCompteurTotalLike);
                // addLike++; //essai
                count.textContent = like;
            });
            // for (let i = like; i < like++; i++) {}
        }
        if (media.video) {
            const video = document.createElement('video');
            video.className = 'photograph-content__video';
            const mediaSource = document.createElement('source');
            mediaSource.src =
                'assets/medias/' + photographerName + '/' + media.video;
            const type = document.createAttribute('type');
            type.value = 'video/mp4';
            mediaSource.setAttributeNode(type);
            video.appendChild(mediaSource);
            section.append(video);
        }
        section.append(title);
        content.append(section);
    });

    //compteur total
    if (main) {
        const totalLikes = document.createElement('p');
        totalLikes.id = 'photograph-content__totalLikes';
        //Réduit un tableau grâce à une fonction accumulatrice
        totalLikes.textContent = medias.reduce(
            (acc, media) => +acc + +media.likes,
            0
        ); //compteur total
        content.append(totalLikes);

        // Créer la la partie HTML du total de like
        // Mettre une balise p avec un id spécifique (ex: totalLikes)
        // Dans le addEventListener du like rajouter un appel a cet élément pour modifier ca valeur
        // Faire le total des likes
    }
    
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
    const medias = await getMedias();
    insertMedias(medias, profil.name);
}

init();
