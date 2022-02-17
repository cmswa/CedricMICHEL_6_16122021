//Mettre le code JavaScript lié à la page photographer.html
// const photographerBanner = document.querySelector(".photograph-header");
const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
const id = urlParams.get('id'); //récupère la valeur du champ id dans urlParams et la met dans la const id

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

// profil
async function getProfil() {
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.photographers.find((photographer) => photographer.id === +id);
}

async function displayProfil(profil) {
    const profilSection = document.querySelector('.photograph-header');
    console.log(profil);

    const profilModel = profilFactory(profil);
    //contact modal photographer name
    const photographerNameContact = document.getElementById(
        'modal-photogapherName'
    );
    photographerNameContact.textContent = profil.name;
    const profilDOM = profilModel.getUserPageCardDOM();
    profilSection.appendChild(profilDOM);
}

// lightbox
function buildLightbox(photographerName) {
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
    close.className = 'fas fa-times lightbox-modal__icons';
    close.content = '\f00d';
    close.addEventListener('click', (e) => {
        e;
        lightbox.style.display = 'none';
        header.style.display = 'block';
        main.style.display = 'block';
    });
    // close.addEventListener('click', closeModalConfirm); //event close modal confirm
    // function closeModalConfirm() {
    //     lightbox.style.display = 'none';
    //     header.style.display = 'block';
    //     main.style.display = 'block';
    //       }

    lightbox.append(close);

    // previous image
    const previous = document.createElement('i');
    previous.id = 'previousLightbox';
    previous.className = 'fas fa-chevron-left lightbox-modal__icons';
    previous.content = '\f053';
    previous.addEventListener('click', async (e) => {
        let changeIndex = +e.target.getAttribute('current-index');
        changeIndex--;
        const medias = await getMedias();
        console.log(medias);
        const focusMedia = medias[changeIndex];
        console.log(focusMedia);
        const profil = await getProfil();
        changeLightboxMedia(profil.name, focusMedia, focusMedia.title);
        const previousBtn = document.getElementById('previousLightbox');
        console.log(previousBtn);
        previousBtn.setAttribute('current-index', changeIndex);

        //boucle quand on arrive au début du tableau vers la fin du tableau
        if (changeIndex === 0) {
            changeIndex = medias.length;
            previousBtn.setAttribute('current-index', changeIndex);
            console.log(changeIndex);
        }
        // while (changeIndex === 0) {
        //     changeIndex = medias.length - 1;
        //     previousBtn.setAttribute('current-index', changeIndex);
        // }
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

    // const videoLightbox = document.createElement('video');
    // videoLightbox.id = 'videoLightbox';
    // videoLightbox.className = 'lightbox-modal__video';
    // // const showVideo =  "<video width='320' height='240' controls></video>";
    // // videoLightbox.innerHTML = showVideo;
    // const source = document.createElement('source');
    // source.id = 'sourceLightbox';
    // const type = document.createAttribute('type');
    // type.value = 'video/mp4';
    // source.setAttributeNode(type);
    // videoLightbox.append(source);
    // navigationLightbox.append(videoLightbox);

    // next image
    const next = document.createElement('i');
    next.id = 'nextLightbox';
    next.className = 'fas fa-chevron-right lightbox-modal__icons';
    next.content = '\f054';
    next.addEventListener('click', async (e) => {
        let changeIndex = +e.target.getAttribute('current-index');
        // console.log(e.target.getAttribute('current-index'));
        changeIndex++;
        const medias = await getMedias();
        console.log(medias.lenght);
        console.log(changeIndex);
        //boucle quand on arrive à la fin du tableau vers la début du tableau
        if (changeIndex === medias.length) {
            changeIndex = 0;
        }
        const focusMedia = medias[changeIndex];
        console.log(changeIndex);
        console.log(focusMedia);
        const profil = await getProfil();
        changeLightboxMedia(profil.name, focusMedia, focusMedia.title);
        const nextBtn = document.getElementById('nextLightbox');
        console.log(nextBtn);
        nextBtn.setAttribute('current-index', changeIndex);
    });

    // var start_pos = 0;
    // var img_count = document.getElementsByClassName('lightbox-modal__img').length - 1;
    // var changeImg = function(direction){
    // pos = start_pos = (direction == "next")? (start_pos == img_count)? 0 : start_pos+1 : (start_pos == 0)? img_count : start_pos-1;
    // console.log(pos)
    // }
    // previous.onclick = function(){ changeImg("previous"); }
    // next.onclick = function(){ changeImg("next"); }

    navigationLightbox.append(next);
    document.body.appendChild(lightbox);
}

// lightbox media
function changeLightboxMedia(photographerName, media, title) {
    console.log(media);
    if (media.image) {
        const imageLightbox = document.getElementById('imgLightbox');
        imageLightbox.src =
            'assets/medias/' + photographerName + '/' + media.image;
        imageLightbox.alt = title;
        const videoLightbox = document.getElementById('vidLightbox');
        console.log(videoLightbox);
        videoLightbox.style.display = 'none';
        imageLightbox.style.display = 'block';
    }
    if (media.video) {
        const mediaSourceVideo = document.createElement('source');
        mediaSourceVideo.setAttribute('alt', `${media.title}`);
        console.log(media);
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

// medias
async function getMedias() {
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.media.filter((m) => m.photographerId === +id);
}

// Page des photographes: la galerie des travaux du photographe
function insertMedias(medias, photographerName) {
    const content = document.querySelector('.photograph-content');
    content.innerHTML = '';
    //Réduit un tableau grâce à une fonction accumulatrice
    console.log(medias.reduce((acc, media) => +acc + +media.likes, 0)); //compteur total
    buildLightbox();
    medias.forEach((media, index) => {
        const section = document.createElement('section');
        const title = document.createElement('h3');
        title.textContent = media.title;
        if (media.image) {
            const image = document.createElement('img');
            image.className = 'photograph-content__img';
            image.src = 'assets/medias/' + photographerName + '/' + media.image;
            image.alt = media.title;
            section.append(image);

            // launch lightbox event
            image.addEventListener('click', (e) => {
                e.preventDefault;
                launchModal(photographerName, media, media.title, index);
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

            // launch lightbox event
            video.addEventListener('click', (e) => {
                e.preventDefault;
                launchModal(photographerName, media, media.title, index);
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
                // addLike++; //essai
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
        priceBanner.textContent = medias[0].price + '€ / jour';
        banner.append(priceBanner);

        banner.append(totalLikes);
    }
}

//menu déroulant
async function underDropdown() {
    const medias = await getMedias();
    // FILTRES
    console.log(medias);
    var x = document.getElementById('photograph-select').selectedIndex;
    var filter = document.getElementsByTagName('option')[x];
    console.log(filter);
    const popularity = document.getElementById('popularity');
    const profil = await getProfil();

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
        console.log(mediaSortedBydate);
        insertMedias(mediaSortedBydate, profil.name);
    });
    const title = document.getElementById('title');
    title.addEventListener('click', () => {
        console.log(title);
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
        console.log(mediaSortedByTitle);
        insertMedias(mediaSortedByTitle, profil.name);
    });
    // let titleArray = medias.map((val) => val.title);
    // console.log(titleArray);
    // let dateArray = medias.map((val) => val.date);
    // console.log(dateArray);
    // let popularityArray = medias.map((val) => val.likes);
    // console.log(popularityArray);
    // if (filter === title) {
    //     titleArray.sort();
    //     console.log('trié par titre', titleArray);
    // } else if (filter === popularity) {
    //     popularityArray.sort(sortByIncrease);
    //     console.log('trié par popularité', popularityArray);
    // } else if (filter === date) {
    //     dateArray.sort(sortByDate);
    //     console.log('trié par date', dateArray);
    // }
}
underDropdown();
//tri avec la méthode sort()
// function sortByIncrease(a, b) {
//     return b - a;
// }
// function sortByDate(a, b) {
//     return new Date(b) - new Date(a);
// }

// launch modal lightbox
function launchModal(photographerName, media, title, index) {
    console.log(index);

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
    console.log(profil);
    displayProfil(profil);
    const medias = await getMedias();
    insertMedias(medias, profil.name);
}

init();
