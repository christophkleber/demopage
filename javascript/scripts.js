window.onload = _loadDoc;

/**
 * _loadDoc- triggered when window loaded, gets preference set id of session storage
 *           if not empty loads preference set with id
 *           and adjusts the styling user which is adapted to
 */
function _loadDoc() {
    var prefSet = sessionStorage.getItem('prefSet');
    if(prefSet != null){
        _loadPref(prefSet);
        changeSelectedStyle(prefSet);
    }
}

/**
 * _loadPref- loads preference set of user and adapts to this
 *
 * @param  {int} prefSet  id of preference set
 */
function _loadPref (prefSet) {
    var xhttpreq;
    try{
        /*MODERN BROWSER*/
        xhttpreq = new XMLHttpRequest();
    }catch (e){
        /*Internet Explorer 5+*/
        try{
            xhttpreq = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
            /*Internet Explorer 5*/
            try{
                xhttpreq = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                /*NOT SUPPORTED*/
                alert('XMLHTTP not supported');
                return false;
            }
        }
    }
    xhttpreq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(xhttpreq.responseText);
            _adaptToUser(jsonObj);
        }
    };
    var url = 'https://raw.githubusercontent.com/christophkleber/data/master/' + prefSet;
    xhttpreq.open("GET", url, true);
    xhttpreq.send();
}

/**
 * setPrefSet- Sets Id of Preference Set in Session Storage and reloads page
 *
 * @param  {int} prefSet  id of preference set
 */
function setPrefSet(prefSet) {
    sessionStorage.setItem('prefSet', prefSet);
    location.reload();
}

/**
 * _adaptToUSer- Collects all adaptive web components, sets their attributes and triggers adaptive()
 *
 * @param  {object} jsonObj      JSON Object with attributes, so preference set of user
 */
function _adaptToUser(jsonObj) {
    var adaptiveElements = document.querySelectorAll('.adaptive-polymer-element');
    for (var i = 0; i < adaptiveElements.length; i++) {
        for (var prop in jsonObj[0]) {
            adaptiveElements[i].setAttribute(prop, jsonObj[0][prop]);
        }
        adaptiveElements[i].adaptive();
    }
}

/**
 * _changeSelectedStyle- Set CSS class of selected person and changes text of button
 *
 * @param  {int} prefSet  id of preference set
 */
function changeSelectedStyle (prefSet) {
    var persons = document.querySelectorAll('.person');
    var person = persons[prefSet-1];
    person.className += ' selected';
    var btn = person.querySelector('.btn');
    btn.innerHTML='Adapted';
}