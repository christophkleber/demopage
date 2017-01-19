window.onload = function loadDoc() {
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
            jsonObjPersonOne = [
                {
                    "more-contrast": "true",
                    "text-alternatives": "text",
                    "font-size": "l",
                    "reading-direction": "ltr"

                }
            ];
            jsonObjPersonTwo = [
                {
                    "more-contrast": "true",
                    "text-alternatives": "text",
                    "font-style": "serif",
                    "font-size": "l",
                    "reading-direction": "rtl"

                }
            ];
            jsonObjPersonThree = [
                {
                    "more-contrast": "true",
                    "text-alternatives": "text",
                    "font-style": "serif",
                    "font-size": "l",
                    "reading-direction": "rtl"

                }
            ];
            jsonObj = jsonObjPersonOne;
            var adaptiveElements = document.querySelectorAll('.adaptive-polymer-element');
            for (var i = 0; i < adaptiveElements.length; i++) {
                for (var prop in jsonObj[0]) {
                    adaptiveElements[i].setAttribute(prop, jsonObj[0][prop]);
                }
                adaptiveElements[i].adaptive();
            }
        }
    };
    xhttpreq.open("GET", 'https://raw.githubusercontent.com/christophkleber/data/master/person-two.json', true);
    xhttpreq.send();

};