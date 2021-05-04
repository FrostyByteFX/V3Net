var jsonObj;
var APIKEY = "&apikey=856af75";

    function loadJSONDoc() {

        var url = "http://www.omdbapi.com/?t=Akira"+APIKEY;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
            if(xmlhttp,this.readyState == 4 && xmlhttp.status == 200) {
                    jsonObj = JSON.parse(xmlhttp.responseText);

                    var location = document.getElementById('replacewithposter');
                    var image = document.createElement('img');
                    image.id = "image-div" + i;
                    location.appendChild(image);
                        image.classList.add("img-style");
                    document.getElementById("image-div" + i).src = 
                    jsonObj.Poster;

            } 

        }


    }