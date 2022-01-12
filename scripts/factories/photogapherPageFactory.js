// function photographePage(data) {
//     const { id, photographerId, title, image, likes, date, price } = data;
// }

// function getUserPageCardDOM() {

// }

//profil
function profilFactory(profil) {
    const { name, portrait, city, country, tagline } = profil;

    const picture = `assets/photographers/${portrait}`;

    function getUserPageCardDOM() {
        const article = document.createElement('article');
        const h1 = document.createElement('h1');
        h1.className = 'name';
        h1.textContent = name;

        const img = document.createElement('img');
        img.className = 'portrait';
        img.setAttribute('src', picture);

        const location = document.createElement('div');
        location.className = 'location';
        location.textContent = city + ', ' + country;

        const taglines = document.createElement('div');
        taglines.className = 'taglines';
        taglines.textContent = tagline;

        const description = document.createElement('div');
        description.className = 'description';
        description.appendChild(h1);
        description.appendChild(location);
        description.appendChild(taglines);

        const contactBtn = document.querySelector('.contact_button');

        article.appendChild(description);
        article.appendChild(contactBtn);
        article.appendChild(img);

        return article;
    }
    return { name, picture, location, tagline, getUserPageCardDOM };
}
