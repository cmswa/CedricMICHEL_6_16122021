//Mettre le code JavaScript lié à la page photographer.html
const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get('id'); //récupère la valeur du champ id dans urlParams et la met dans la const id

// profil
async function getProfil() {
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.photographers.find((photographer) => photographer.id === +id);
}

async function displayProfil(profil) {
    const profilSection = document.querySelector('.photograph-header');
    const profilModel = profilFactory(profil);
    //contact modal photographer name
    const photographerNameContact = document.getElementById(
        'modal-photogapherName'
    );
    photographerNameContact.textContent = profil.name;
    const profilDOM = profilModel.getUserPageCardDOM();
    profilSection.appendChild(profilDOM);
}

// medias
async function getMedias() {
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.media.filter((m) => m.photographerId === +id);
}

/// Page photographe: la galerie des travaux du photographe //

async function insertMedias(medias, photographerName) {
    const content = document.querySelector('.photograph-content');
    content.innerHTML = '';
    //Réduit un tableau grâce à une fonction accumulatrice
    // console.log(medias.reduce((acc, media) => +acc + +media.likes, 0)); //compteur total
    buildLightbox();
    medias.forEach((media, index) => {
        const section = document.createElement('section');
        const title = document.createElement('h3');
        title.textContent = media.title;
        if (media.image) {
            const image = document.createElement('img');
            image.className = 'photograph-content__img';
            image.src = 'assets/medias/' + photographerName + '/' + media.image;
            image.alt = `${media.title}, closeup view`;
            section.append(image);

            // launch lightbox event
            image.addEventListener('click', (e) => {
                e.preventDefault;
                launchModal(photographerName, media, media.title, index);
            });

            image.addEventListener('keydown', (e) => {
                if (e.code === 'Enter') {
                    e.preventDefault();
                    launchModal(photographerName, media, media.title, index);
                }
            });

            // likes par défault pour une image
            let like = document.createElement('div');
            like.className = 'photograph-content__likes';
            const pLike = document.createElement('p');
            pLike.textContent = media.likes; // nombre de likes pour chaque photo

            like.append(pLike);
            title.append(like);

            const heart = document.createElement('i');
            heart.className = 'fas fa-heart photograph-content__hearts';
            heart.content = '\f004';
            heart.setAttribute('aria-label', 'likes');
            like.append(heart);

            // ajout +1 compteur de like
            like = media.likes;
            heart.addEventListener('click', (e) => {
                const count = e.target.previousSibling; //previousSibling renvoie le nœud (node) précédant immédiatement le nœud courant dans la liste childNodes de son parent
                like++;
                const compteurTotalLike = document.getElementById(
                    'photograph-content__totalLikes'
                );
                console.log(compteurTotalLike);
                let variableCompteurTotalLike = compteurTotalLike.textContent;
                variableCompteurTotalLike++;
                compteurTotalLike.textContent = variableCompteurTotalLike;
                console.log(variableCompteurTotalLike);
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
            mediaSource.setAttribute('alt', `${media.title}, closeup view`);
            video.appendChild(mediaSource);
            section.append(video);

            // launch lightbox event
            video.addEventListener('click', (e) => {
                e.preventDefault;
                launchModal(photographerName, media, media.title, index);
            });

            video.addEventListener('keydown', (e) => {
                if (e.code === 'Enter') {
                    e.preventDefault();
                    launchModal(photographerName, media, media.title, index);
                }
            });

            // likes par défault pour une vidéo
            let like = document.createElement('div');
            like.className = 'photograph-content__likes';
            const pLike = document.createElement('p');
            pLike.textContent = media.likes; // nombre de likes pour chaque photo

            like.append(pLike);
            title.append(like);

            const heart = document.createElement('i');
            heart.className = 'fas fa-heart photograph-content__hearts';
            heart.content = '\f004';
            heart.setAttribute('aria-label', 'likes');
            like.append(heart);

            // ajout +1 compteur de like
            like = media.likes;
            heart.addEventListener('click', (e) => {
                const count = e.target.previousSibling; //previousSibling renvoie le nœud (node) précédant immédiatement le nœud courant dans la liste childNodes de son parent
                like++;
                const compteurTotalLike = document.getElementById(
                    'photograph-content__totalLikes'
                );
                console.log(compteurTotalLike);
                let variableCompteurTotalLike = compteurTotalLike.textContent;
                variableCompteurTotalLike++;
                compteurTotalLike.textContent = variableCompteurTotalLike;
                console.log(variableCompteurTotalLike);
                count.textContent = like;
            });
        }
        section.append(title);
        content.append(section);
    });

    // compteur total
    if (main) {
        // bannière (container pour faciliter la mise en page)
        const banner = document.createElement('div');
        banner.id = 'photograph-content__banner';
        content.append(banner);

        const totalLikes = document.createElement('p');
        totalLikes.id = 'photograph-content__totalLikes';
        //Réduit un tableau grâce à une fonction accumulatrice
        totalLikes.textContent = medias.reduce(
            (acc, media) => +acc + +media.likes,
            0
        ); //compteur total
        const heart = document.createElement('i');

        //bannière
        heart.className = 'fas fa-heart photograph-content__hearts';
        heart.content = '\f004';
        banner.append(heart);
        const priceBanner = document.createElement('p');
        priceBanner.id = 'photograph-content__priceBanner';
        const profil = await getProfil();
        priceBanner.textContent = profil.price + '€ / jour';
        banner.append(priceBanner);

        banner.append(totalLikes);
    }
}

//menu déroulant (filtres)
async function underDropdown() {
    const medias = await getMedias();
    // FILTRES
    var x = document.getElementById('photograph-select').selectedIndex;
    var filter = document.getElementsByTagName('option')[x];
    const popularity = document.getElementById('popularity');
    const profil = await getProfil();

    //filtre par défaut en arrivant sur la page du photographe (ici popularité)
    if (x === 0) {
        //tri avec la méthode sort()
        const mediaSortedByPopularity = medias.sort(function (a, b) {
            return b.likes - a.likes;
        });
        insertMedias(mediaSortedByPopularity, profil.name);
    }

    popularity.addEventListener('click', () => {
        filter = popularity;
        //tri avec la méthode sort()
        const mediaSortedByPopularity = medias.sort(function (a, b) {
            return b.likes - a.likes;
        });
        insertMedias(mediaSortedByPopularity, profil.name);
    });

    const date = document.getElementById('date');
    date.addEventListener('click', () => {
        filter = date;
        const mediaSortedBydate = medias.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        insertMedias(mediaSortedBydate, profil.name);
    });

    const title = document.getElementById('title');
    title.addEventListener('click', () => {
        filter = title;
        const mediaSortedByTitle = medias.sort(function (a, b) {
            if (b.title > a.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        insertMedias(mediaSortedByTitle, profil.name);
    });
}

/// lightbox //

function buildLightbox() {
    const lightbox = document.createElement('div');
    const titleLightbox = document.createElement('h3');
    titleLightbox.id = 'lightbox-title';
    lightbox.id = 'lightbox-modal';
    lightbox.style.display = 'none';

    //container pour faciliter la mise en page
    const navigationLightbox = document.createElement('div');
    navigationLightbox.id = 'navLightbox';
    lightbox.append(navigationLightbox);

    // close lightbox
    const close = document.createElement('i');
    close.id = 'lightbox-modal__close';
    close.setAttribute('aria-label', 'Close dialog');
    close.className = 'fas fa-times lightbox-modal__icons';
    close.content = '\f00d';
    close.addEventListener('click', (e) => {
        e;
        lightbox.style.display = 'none';
        header.style.display = 'block';
        main.style.display = 'block';
    });

    //evenement fermeture lightbox via touche échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            header.style.display = 'block';
            main.style.display = 'block';
        }
    });
    lightbox.append(close);

    // previous image
    const previous = document.createElement('i');
    previous.id = 'previousLightbox';
    previous.setAttribute('aria-label', 'Previous image');
    previous.className = 'fas fa-chevron-left lightbox-modal__icons';
    previous.content = '\f053';
    //evenement click afficher img précédente
    previous.addEventListener('click', async (e) => {
        const medias = await getMedias();
        let changeIndex = +e.target.getAttribute('current-index'); //référence à l'objet qui a envoyé l'événement

        //boucle quand on arrive au début du tableau vers la fin du tableau
        if (changeIndex === 0) {
            changeIndex = medias.length - 1;
        } else {
            changeIndex--;
        }

        const focusMedia = medias[changeIndex];
        const profil = await getProfil();
        changeLightboxMedia(profil.name, focusMedia, focusMedia.title);
        const previousBtn = document.getElementById('previousLightbox');
        previousBtn.setAttribute('current-index', changeIndex);
        const nextBtn = document.getElementById('nextLightbox');
        nextBtn.setAttribute('current-index', changeIndex);
    });

    //evenement navigation keydown (touches fléchées)
    document.addEventListener('keydown', async (e) => {
        if (e.key === 'ArrowLeft') {
            const medias = await getMedias();
            const previousBtn = document.getElementById('previousLightbox');
            let changeIndex = +previousBtn.getAttribute('current-index');

            //boucle quand on arrive au début du tableau vers la fin du tableau
            if (changeIndex === 0) {
                changeIndex = medias.length - 1;
            } else {
                changeIndex--;
            }

            const focusMedia = medias[changeIndex];
            const profil = await getProfil();
            changeLightboxMedia(profil.name, focusMedia, focusMedia.title);

            previousBtn.setAttribute('current-index', changeIndex);
            const nextBtn = document.getElementById('nextLightbox');
            nextBtn.setAttribute('current-index', changeIndex);
        }
        if (e.key === 'ArrowRight') {
            const nextBtn = document.getElementById('nextLightbox');
            let changeIndex = +nextBtn.getAttribute('current-index');
            changeIndex++;
            const medias = await getMedias();

            //boucle quand on arrive à la fin du tableau vers la début du tableau
            if (changeIndex === medias.length) {
                changeIndex = 0;
            }

            const focusMedia = medias[changeIndex];
            const profil = await getProfil();
            changeLightboxMedia(profil.name, focusMedia, focusMedia.title);
            nextBtn.setAttribute('current-index', changeIndex);
            const previousBtn = document.getElementById('previousLightbox');
            previousBtn.setAttribute('current-index', changeIndex);
        }
    });
    navigationLightbox.append(previous);

    // lightbox element image
    const imageLightbox = document.createElement('img');
    imageLightbox.id = 'imgLightbox';
    imageLightbox.className = 'lightbox-modal__img';
    navigationLightbox.append(imageLightbox);
    lightbox.append(titleLightbox);

    // lightbox element video
    const mediaVideo = document.createElement('video');
    mediaVideo.id = 'vidLightbox';
    mediaVideo.className = 'lightbox-modal__video';
    navigationLightbox.appendChild(mediaVideo);

    // next image
    const next = document.createElement('i');
    next.id = 'nextLightbox';
    next.setAttribute('aria-label', 'Next image');
    next.className = 'fas fa-chevron-right lightbox-modal__icons';
    next.content = '\f054';
    //evenement click afficher img suivante
    next.addEventListener('click', async (e) => {
        let changeIndex = +e.target.getAttribute('current-index');
        changeIndex++;
        const medias = await getMedias();

        //boucle quand on arrive à la fin du tableau vers la début du tableau
        if (changeIndex === medias.length) {
            changeIndex = 0;
        }

        const focusMedia = medias[changeIndex];
        const profil = await getProfil();
        changeLightboxMedia(profil.name, focusMedia, focusMedia.title);
        const nextBtn = document.getElementById('nextLightbox');
        nextBtn.setAttribute('current-index', changeIndex);
        const previousBtn = document.getElementById('previousLightbox');
        previousBtn.setAttribute('current-index', changeIndex);
    });

    navigationLightbox.append(next);
    document.body.appendChild(lightbox);
}

// lightbox media
function changeLightboxMedia(photographerName, media, title) {
    if (media.image) {
        const imageLightbox = document.getElementById('imgLightbox');
        imageLightbox.src =
            'assets/medias/' + photographerName + '/' + media.image;
        imageLightbox.alt = title;
        const videoLightbox = document.getElementById('vidLightbox');
        videoLightbox.style.display = 'none';
        imageLightbox.style.display = 'block';
    }
    if (media.video) {
        const mediaSourceVideo = document.createElement('source');
        mediaSourceVideo.setAttribute('alt', `${media.title}`);
        mediaSourceVideo.src =
            'assets/medias/' + photographerName + '/' + media.video;
        const controls = document.createAttribute('controls');
        const mediaVideo = document.getElementById('vidLightbox');
        mediaVideo.setAttributeNode(controls);
        mediaVideo.appendChild(mediaSourceVideo);
        const imageLightbox = document.getElementById('imgLightbox');
        const videoLightbox = document.getElementById('vidLightbox');
        videoLightbox.style.display = 'block';
        imageLightbox.style.display = 'none';
    }
    const titleImage = document.getElementById('lightbox-title');
    titleImage.textContent = title;
}

// launch modal lightbox
function launchModal(photographerName, media, title, index) {
    const lightbox = document.getElementById('lightbox-modal');
    const previous = document.getElementById('previousLightbox');
    const next = document.getElementById('nextLightbox');
    previous.setAttribute('current-index', index);

    next.setAttribute('current-index', index);
    header.style.display = 'none';
    main.style.display = 'none';
    lightbox.style.display = 'block';
    changeLightboxMedia(photographerName, media, title);
}

async function init() {
    const profil = await getProfil();
    // console.log(profil);
    displayProfil(profil);
    const medias = await getMedias();
    insertMedias(medias, profil.name);

    underDropdown();
}

init();
