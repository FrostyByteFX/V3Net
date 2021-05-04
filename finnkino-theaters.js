var url ="https://www.finnkino.fi/xml/TheatreAreas/";
fetch(url).then((response) => {
return response.text();
})
.then((data) => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, "text/xml");

    y = xmlDoc.getElementsByTagName("Name").length; //haetaan xml tidostosta kuinka monta "Name" elemnttiä eli nodea löytyy. tämä saadaan selville .length avulla.
    var div = document.getElementById("theater"); //haetaan dokumentista eli html tidostosta div elementti, jonka id on "theater" getElementById avulla.

    for (i = 0; i < y; i++) { //For loopin avulla täydennetään html tiedostossa olevaa <select> elementtiä luomalla sinne uusia "option" elementtejä.
        //For loop menee niin kauan kunnes Name tagejä ei enää ole ja .length avulla saatu tieto mahdollistaa teattereiden lisäämisen ja poistamisen. Mitään ei ole niin sanotusti hardcoded/kovakoodattu.
        var ID = document.createElement("option"); //luo uuden elementin valinnan <option> html:ssä olevaan <select> tagien sisään, joka on id:ltä "threater"
        ID.id = i;
        div.appendChild(ID);
        document.getElementById(i).innerHTML =
        xmlDoc.getElementsByTagName("Name")[i].childNodes[0].nodeValue;
    }
});