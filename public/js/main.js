var app = (function() {

    var url = "/api/nav.json";

    function init() {
        jsonRequest(url);
    }

    function jsonRequest() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response = JSON.parse(xmlhttp.responseText);
                templetizate(response);
            }
        };
    }

    function templetizate(data) {
        var navData = data.items,
            navTemplate = document.getElementById('navTemplate').innerHTML,
            subNavTemplate = document.getElementById('subNavTemplate').innerHTML,
            placeHolderNav = document.getElementsByClassName('nav-template')[0];

        for (var key in navData) {
            var obj = navData[key],
                navTemp = navTemplate;

            if (navData.hasOwnProperty(key)) {
                for (var prop in obj) {
                    var subNavTemp = subNavTemplate;
                    if (obj.hasOwnProperty(prop)) {
                        navTemp = navTemp.replace('{{' + prop + '}}', obj[prop]);
                    }
                }

                placeHolderNav.innerHTML += navTemp;
                //placeHolderSubnav =
            }
        }
    }

    return {
        init: init
    }

})();

app.init();