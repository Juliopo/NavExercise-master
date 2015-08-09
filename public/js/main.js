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
                return response;
            }
        };
    }

    function templetizate(context) {
        var navData = context.items,
            navTemplate = document.getElementById('navTemplate').innerHTML,
            subNavTemplate = document.getElementById('subNavTemplate').innerHTML,
            placeHolderNav = document.getElementsByClassName('nav-template')[0];

        for (var key in navData) {
            var obj = navData[key],
                navTemp = navTemplate,
                subNavTemp = subNavTemplate,
                placeHolderSubnav;

            if (navData.hasOwnProperty(key)) {
                for (var prop in obj) {
                    var subObj = obj.items[key];
                    if (obj.hasOwnProperty(prop)) {
                        navTemp = navTemp.replace('{{' + prop + '}}', obj[prop]);
                    }
                }

                placeHolderNav.innerHTML += navTemp;
                placeHolderSubnav = document.getElementsByClassName('sub');

                if (obj.items.length) {
                    for (var sub in obj.items) {
                        if (obj.items.hasOwnProperty(sub)) {
                            for (var l in obj.items[sub]) {
                                subNavTemp = subNavTemp.replace('{{' + l + '}}', obj.items[sub][l]);
                            }
                        }
                        placeHolderSubnav[key].innerHTML += subNavTemp;
                        subNavTemp = subNavTemplate;
                    }
                }
            }
        }
    }

    return {
        init: init
    }

})();

app.init();