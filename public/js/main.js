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
            icon = document.createElement("div");
            icon.className = 'icon up',
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
                    placeHolderSubnav[key].parentElement.appendChild(icon);
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
        var element = context.parentElement.getElementsByClassName('sub')[0],
            icon = context.parentElement.getElementsByClassName('icon')[0];

        if (element.className.indexOf('hide') > 0) {
            element.className = 'sub show';
            icon.className = 'icon down';

        } else if(element.className.indexOf('inactive') < 0) {
            element.className = 'sub hide';
            icon.className = 'icon up';
        }
    }

    function bindEvents() {
        var mobileNavButton = document.getElementsByClassName('nav-mobile')[0],
            closeNavButton = document.getElementsByClassName('close-nav')[0],
            logo = document.getElementsByClassName('logo')[0],
            navigation = document.getElementsByClassName('nav-template')[0],
            navigationLink = navigation.getElementsByClassName('active'),
            traslucent = document.getElementsByClassName('translucent')[0];

            for (var i = 0; i < navigationLink.length; i ++) {
                 navigationLink[i].addEventListener('click', function() {
                    toggle(this.getElementsByTagName('a')[0]);
                });
            }

            toggleMobileMenu(mobileNavButton, mobileNavButton, closeNavButton, logo, navigation, traslucent);
            toggleMobileMenu(closeNavButton, mobileNavButton, closeNavButton, logo, navigation, traslucent);
            toggleMobileMenu(traslucent, mobileNavButton, closeNavButton, logo, navigation, traslucent);
    }

    function toggleMobileMenu(eventButton, mobileNavButton, closeNavButton, logo,  navigation, traslucent) {
        navigation.className = 'nav-template animate-out';

        eventButton.addEventListener("click", function() {

            if (navigation.className.indexOf('animate-in') > 0) {
                navigation.className = 'nav-template animate-out';
                logo.className = 'logo hide';
                closeNavButton.className = 'close-nav hide';
                mobileNavButton.className = 'nav-mobile show';
                traslucent.className = 'translucent off';

            } else {
                navigation.className = 'nav-template animate-in';
                logo.className = 'logo show';
                mobileNavButton.className = 'nav-mobile hide';
                closeNavButton.className = 'close-nav show';
                traslucent.className = 'translucent on';
            }

        }, false);
    }

    return {
        init: init,
        jsonRequest:jsonRequest,
        templetizate: templetizate
    }

})();

app.init();