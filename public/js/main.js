var app = (function() {

    var url = "/api/nav.json";

    function init() {
        jsonRequest(url);
    }

    function jsonRequest(url) {
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
                        placeHolderSubnav[key].parentElement.className = 'active close';
                    }
                } else {
                    placeHolderSubnav[key].className = 'sub inactive';
                }
            }
        }
        bindEvents();
        return {
            "placeHolderNav": placeHolderNav,
            "placeHolderSubnav": placeHolderSubnav
        }
    }

    function toggle(context) {
        var element = context.parentElement.getElementsByClassName('sub')[0];
        if (element.className.indexOf('hide') > 0) {
            element.className = 'sub show';

        } else if(element.className.indexOf('inactive') < 0) {
            element.className = 'sub hide';
        }
    }

    function bindEvents() {
        var mobileNavButton = document.getElementsByClassName('nav-mobile')[0],
            closeNavButton = document.getElementsByClassName('close-nav')[0],
            logo = document.getElementsByClassName('logo')[0],
            navigation = document.getElementsByClassName('nav-template')[0];
            toggleMobile(mobileNavButton, mobileNavButton, closeNavButton, logo, navigation);
            toggleMobile(closeNavButton, mobileNavButton, closeNavButton, logo, navigation);


    }

    function toggleMobile(eventButton, mobileNavButton, closeNavButton, logo,  navigation) {
        navigation.className = 'nav-template animate-out';
        eventButton.addEventListener("click", function() {
            if (navigation.className.indexOf('animate-in') > 0) {
                navigation.className = 'nav-template animate-out';
                logo.className = 'logo hide';
                closeNavButton.className = 'close-nav hide';
                mobileNavButton.className = 'nav-mobile show';
            } else {
                navigation.className = 'nav-template animate-in';
                logo.className = 'logo show';
                mobileNavButton.className = 'nav-mobile hide';
                closeNavButton.className = 'close-nav show';
            }
        }, false);
    }

    return {
        init: init,
        jsonRequest:jsonRequest,
        toggle: toggle,
        templetizate: templetizate
    }

})();

app.init();