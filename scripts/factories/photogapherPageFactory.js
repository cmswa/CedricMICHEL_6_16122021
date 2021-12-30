// function photographePage(data) {
//     const { id, photographerId, title, image, likes, date, price } = data;
// }

// function getUserPageCardDOM() {

// }

//profil
function profilFactory(profil) {
    const { name, portrait, city, country } = profil;

  
    const picture = `assets/photographers/${portrait}`;
  
    function getUserPageCardDOM() {
      const article = document.createElement("article");
      const h1 = document.createElement("h1");
      h1.textContent = name;
      console.log(h1);
  
      const img = document.createElement("img");
      img.className = 'portrait';
      img.setAttribute("src", picture);
  
      const location = document.createElement("div");
      location.className = "location";
      location.textContent = city + ", " + country;

  
      const intro = document.createElement("div");
      intro.className = "intro";
      intro.appendChild(h1);
      intro.appendChild(location);
  
      const contactBtn = document.querySelector(".contact_button");
  
      article.appendChild(intro);
      article.appendChild(contactBtn);
      article.appendChild(img);
  
      return (article);
    }
    return { name, picture, location, getUserPageCardDOM };
  }