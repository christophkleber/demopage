window.onload = loadDoc;

function loadDoc() {
    var prefSet = sessionStorage.getItem('prefSet');
    console.log(prefSet);
    if(prefSet != null){
        loadPref(prefSet);
        changeSelectedStyle(prefSet);

    }
}

function loadPref (prefSet) {
    console.log('xmlhttp');
    var xhttpreq;
    try{
        //Moderner Browser
        xhttpreq = new XMLHttpRequest();
    }catch (e){
        //Internet Explorer 5+
        try{
            xhttpreq = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
            //Internet Explorer 5
            try{
                xhttpreq = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (e){
                //Wird nicht unterstützt
                alert('XMLHTTP not supported');
                return false;
            }

        }
    }
    xhttpreq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(xhttpreq.responseText);
            console.log(jsonObj);
            adaptToUser(jsonObj);

        }
    };
    var url = 'https://raw.githubusercontent.com/christophkleber/data/master/' + prefSet;
    xhttpreq.open("GET", url, true);
    xhttpreq.send();
}

function setPrefSet(prefSet) {
    sessionStorage.setItem('prefSet', prefSet);
    location.reload();


}

function adaptToUser(jsonObj) {
    var adaptiveElements = document.querySelectorAll('.adaptive-polymer-element');
    console.log(adaptiveElements);
    for (var i = 0; i < adaptiveElements.length; i++) {
        for (var prop in jsonObj[0]) {
            adaptiveElements[i].setAttribute(prop, jsonObj[0][prop]);
        }
        adaptiveElements[i].adaptive();
    }
}

function changeSelectedStyle (prefSet) {
    var persons = document.querySelectorAll('.person');
    var person = persons[prefSet-1];
    person.className += ' selected';
    var btn = person.querySelector('.btn');
    btn.innerHTML='Adapted';
    console.log('button:' + btn);
}