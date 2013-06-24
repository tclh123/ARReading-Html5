/**
 * Inception - AR Reading App.
 * User: tclh123
 * Date: 12-8-28
 * Time: 下午3:51
 * Copyright (C)2012 Inception Team
 */

AR.Webcam = function(webcam){
    var getUserMedia = function(t, onsuccess, onerror) {
        if (navigator.getUserMedia) {
            return navigator.getUserMedia(t, onsuccess, onerror);
        } else if (navigator.webkitGetUserMedia) {
            return navigator.webkitGetUserMedia(t, onsuccess, onerror);
        } else if (navigator.mozGetUserMedia) {
            return navigator.mozGetUserMedia(t, onsuccess, onerror);
        }
        else if (navigator.msGetUserMedia) {
            return navigator.msGetUserMedia({ "video": true, "audio": false }, onsuccess, onerror);
        } else {
            onerror(new Error("No getUserMedia implementation found."));
        }
    };
    var URL = window.URL || window.webkitURL;
    var createObjectURL = URL.createObjectURL || webkitURL.createObjectURL;
    if (!createObjectURL) {
        throw new Error("URL.createObjectURL not found.");
    }
    getUserMedia({
            //'video': { mandatory: { minWidth: 768, minHeight: 1024 } }
            'video': true
        },
        function(stream) {
            var url = createObjectURL(stream);
            webcam.src = url;
            document.getElementById('loading').style.display = 'none';
        },
        function(error) {
            alert("Couldn't access webcam.");
        });
};