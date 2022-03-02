//profils photographes (acceuil)
function photographerFactory(data) {

    const { name, portrait, city, country, tagline, price, id, alt } = data;
    
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const lienCard = document.createElement( 'a' );
        lienCard.className = 'photographe-section__lienCard';
        lienCard.setAttribute('aria-Label', `Aller sur la page de ${name} basé à ${city}, ${country} 
        ,sa devise est ${tagline}, son tarif est de ${price} euros par jour.`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.alt = name;
        const h2 = document.createElement( 'h2' );
        h2.className = 'name';
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.className = 'location';
        h3.textContent = city + ', ' + country;
        const h4 = document.createElement( 'h4' );
        h4.className = 'taglines';
        h4.textContent = tagline;
        const h5 = document.createElement( 'h5' );
        h5.textContent = price + '€/jour';

        // Event pour aller a la page photographe
        lienCard.addEventListener("click", () => {
            window.location = `photographer.html?id=${id}`;
        });

        lienCard.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                e.preventDefault();
                window.location = `photographer.html?id=${id}`;
            }
        });
    
        article.appendChild(lienCard);
        lienCard.appendChild(img);
        lienCard.appendChild(h2);
        lienCard.appendChild(h3);
        lienCard.appendChild(h4);
        lienCard.appendChild(h5);
        return (article);
    }
    return { name, picture, city, country, tagline, price, id, alt, getUserCardDOM }
}