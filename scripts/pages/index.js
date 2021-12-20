async function getPhotographers() {
    const photographers = './data/photographers.json';
    // console.log(photographers);
    await fetch(photographers)
    .then((response) => response.json())
        .then((data) => {
            photographersData = data.photographers;
            console.log(data.photographers);
        })
        .catch((err) => console.log("Error : " + err));
    ;
    
    // et bien retourner le tableau photographers seulement une fois
    return photographersData;
}


async function displayData(photographers) {
    const photographersSection = document.querySelector(
        '.photographer_section'
    );

    photographersData.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
