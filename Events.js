const parameters = window.location.search; //parametrit haetaan urlista
var url ="https://www.finnkino.fi/xml/Events/"+parameters; //parametris ja linkku luodaan muuttujaan url
fetch(url).then((response) => { //Haetaan url, joka luotiin ylhäällä ja tehdään haku pyynto Finnkinon xml api:lle
return response.text();
})
.then((data) => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, "text/xml"); //luodaan xmlDoc objekti joka sisältää haetun datan xml muodossa.

    y = xmlDoc.getElementsByTagName("OriginalTitle").length; //katsotaan, kuinka monta Original Titleä eli leffaa löytyy Finnkinon xml:lästä, jotta voidaan seuraavassa loopissa jatkaa
    //looppia vain sen verran kuin täytyy. .length:in avulla saadaan tietää kuinka monta tietyn nimistä elementtiä kyseisessä xml tiedostossa on.

    for (i = 0; i < y; i++) { //for loopilla luodaan sisältö sivustolle. For loop jatkuu kunnes kaikki Original title tagit on käyty läpi
    var location = document.getElementById('events-divc'); // haetaan event-divc, joka on div elementti. Tämän div elementin sisään luodaan sisältö

        var Bg = document.createElement('div');  //luodaan uusi div, jota käytetään taustana, muille elementeille jotka luodaan tämän jälkeen
        Bg.id = "Bg" + i; // + i ottaa kyseisen i arvon ja lisää sen Bg perään luoden monta eri id:llä omaavaa elementtiä, joihin voidaan loopin aikana myöhemmin viitata.
        location.appendChild(Bg); //yhdistetään Bg elementti osaksi events-divc divin sisälle.
            Bg.classList.add("Bg-style"); //luodaan uusi class, jossa voidaan css tiedostossa myöhemmin määritellä eri tyyli asetuksia.
        
        var ID = document.createElement('p'); //luodaan teksti sisältöä <p>
        ID.id = "ID-div" + i;
        Bg.appendChild(ID);
            ID.classList.add("ID-style");
        document.getElementById("ID-div" + i).innerHTML = //Haetaan ID-div ja kyseisen loopin arvo eli i, ja tähän divin sisälle sijoitetaan xml dokumentista arvo ID
        xmlDoc.getElementsByTagName("ID")[i].childNodes[0].nodeValue; //Arvo ID haetaan xmlDoc datasta .getElementByTagName avulla ja monesko ID arvo haetaan riippuu kyseisen i arvosta [i]

        var Title = document.createElement('p'); //luodaan otsikko elementti 
        Title.id = "Title-div" + i;
        Bg.appendChild(Title);
            Title.classList.add("Title-style");
        document.getElementById("Title-div" + i).innerHTML =
        xmlDoc.getElementsByTagName("OriginalTitle")[i].childNodes[0].nodeValue;

        var anchor = document.createElement('a'); // Luodaan ankkuri <a> elementti
        Bg.appendChild(anchor);
        anchor.href = "#"+ xmlDoc.getElementsByTagName("OriginalTitle")[i].childNodes[0].nodeValue; //Jokaisen ankkuri elementin sisään tulee kyseisen leffan nimi eli
        //href="#leffan nimi" ja tämän loin, kun mietin voisiko sivulle tehdä alkeellisen search ominaisuuden, mutta en päättänyt jatkaa ajatusta eteenpäin.
        anchor.target ="_blank";
       

        var divl = document.createElement('div'); //loin divl eli div left ja myöhemmin divr, niin sanotuiden laatikoiden asettelua ja elementtien järjestelyä varten.
        divl.id = "divl" + i;
        Bg.appendChild(divl);
            divl.classList.add("divl-style");

        var image = document.createElement('img'); //Luodaan kuva elementti sivulle
        image.id = "image-div" + i;
        divl.appendChild(image);
            image.classList.add("img-style");
        document.getElementById("image-div" + i).src = //.innerHTML sijaan sijoitan xml tiedostosta löytyvän kuvan nettisivu linkin suoraan kuvan src muuttujaan, jolloin src
        xmlDoc.getElementsByTagName("EventLargeImagePortrait")[i].childNodes[0].nodeValue; // avulla hakee koodi netistä kuvan https: osoitteen avulla.

        var divr = document.createElement('div'); //luodaan div right elementti
        divr.id = "divr" + i;
        Bg.appendChild(divr);
            divr.classList.add("divr-style");

        var ShortSynopsis = document.createElement('p');
        ShortSynopsis.id = "p-div" + i;
        divr.appendChild(ShortSynopsis);
            ShortSynopsis.classList.add("p-style");
        document.getElementById("p-div" + i).innerHTML =
        xmlDoc.getElementsByTagName("ShortSynopsis")[i].childNodes[0].nodeValue;

        var downr = document.createElement('div'); //luodaan down right ja myöhemmin down left samasta syystä kuin aikaisemmin div left ja div right
        downr.id = "divr" + i;
        Bg.appendChild(downr);
            downr.classList.add("downr-style");
        
        var downl = document.createElement('div');
        downl.id = "divr" + i;
        Bg.appendChild(downl);
            downl.classList.add("downl-style");

        var year = document.createElement('p');
        year.id = "year-div" + i;
        downl.appendChild(year);
            year.classList.add("year-style");
        document.getElementById("year-div" + i).innerHTML =
        xmlDoc.getElementsByTagName("ProductionYear")[i].childNodes[0].nodeValue;

        var genre = document.createElement('p');
        genre.id = "genre-div" + i;
        downl.appendChild(genre);
            genre.classList.add("genre-style");
        document.getElementById("genre-div" + i).innerHTML =
        xmlDoc.getElementsByTagName("Genres")[i].childNodes[0].nodeValue;

        var movielengthp = document.createElement('p');
        movielengthp.id = "movielength-div" + i;
        downr.appendChild(movielengthp);
            movielengthp.classList.add("movielength-style");
        var movielength = xmlDoc.getElementsByTagName("LengthInMinutes")[i].childNodes[0].nodeValue; //luodaan movielength muuttuja, jotta alemmat laskutoimitukset helpottuvat 
        var hours = (movielength/60); //Lasketaan tunnit minuuteista
        var inthours = Math.floor(hours); //muutetaan tunnit int, koska ne muuten saatettaisiin pyöristettäisiin ylöspäin myöhemmin
        var minutes = (movielength%60); // Lasketaan jakojäännos eli minuutit
        if (movielength < 0.01) { //if lauseella tarkistetaan, jos elokuvan pituutta ei ole määritetty ja näin on yleensä ensi-ilta esityksissä.
            document.getElementById("movielength-div" + i).innerHTML =
            " ";
        } else { //jos elokuvan pituus on yli 0.01 niin silloin tunnit ja minuutit luodaan elementtiin movielength-div+i ja jos ei niin silloin luodaan vain tyhjä teksti kenttä.
        document.getElementById("movielength-div" + i).innerHTML =
        "Kesto: "+inthours.toFixed(0)+ " t " + minutes + " min "; //Muokataan tunnit muotoon 0 desimaalio, joilloin vain kokonaisluku. (ei tarpeen korjauksen jälkeen tuntejen pöyristykseen)
        }

        var date = document.createElement('p');
        date.id = "date-div" + i;
        downl.appendChild(date);
            date.classList.add("date-style");
        var releasedate = xmlDoc.getElementsByTagName("dtLocalRelease")[i].childNodes[0].nodeValue; //xml tiedostosta haetaan tagi dtLocalRelease jolla saadaan selville suomessa julkaistu aika
        var currentdate = new Date().toJSON().slice(0, 10) //muutetaan nykyinen päivämäärä json muotoon ja otetaan vain 10 ekaa kirjainta eli MM-DD-YYYY
        var releasedateslice = releasedate.slice(0, 10); // Päivämäärä, joka haettiin ja otetaan siitäkin vain ensimmäiset 10 kirjainta eli MM-DD-YYYY
            if (releasedateslice > currentdate == true) {
                document.getElementById("date-div" + i).innerHTML =
                "Ensi-ilta Suomessa: "+releasedateslice.substring(8, 10)+"."+releasedateslice.substring(5, 7)+"."+releasedateslice.substring(0, 4); //Korjataan MM-DD-YYYY muotoon DD.MM.YYYY 
                } else {
            document.getElementById("date-div" + i).innerHTML =
            "Julkaisu päivä: "+ releasedate.substring(8, 10)+"."+releasedate.substring(5, 7)+"."+releasedate.substring(0, 4); //Korjataan MM-DD-YYYY muotoon DD.MM.YYYY
            }
       
        var video = document.createElement('iframe'); //Toimii mutta selain valitaa CORS ongelmista ja kaataa koko selaimen vaikka olisi CORS poistettu chrome lisäosalla. vaatii parametrin
        var Youtube = "https://www.youtube.com/embed/"; //perus youtube embeded linkki
        video.id = "player" + i;
        downr.appendChild(video);
            video.classList.add("video-div")
        video.src= Youtube + xmlDoc.getElementsByTagName("Location")[i].childNodes[0].nodeValue; //video elementtiin joka aikasemmin luotiin sijoitetaan src arvo joka yhdistää Youtube linkin
        //ja hakee xml tiedostosta lyhyen youtube video tagin esimerkiksi "Uhb4T8LlDRQ" ja lisää sen Youtube linkin jatkoksi. Tämän avulla iframe elemntti löytää oikean youtube videon.

    }
});