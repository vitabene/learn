window.onload = function() {
   var micon = document.getElementById("menu-icon");
    micon.addEventListener("click", function() {alert("Works");}, false);

    function showMenu() {
        var nav = document.getElementsByTagName("nav")[0];
        if (nav.className == "") nav.className = "show";
        else if (nav.className == "show") nav.className = "";
    }
    // showTime();

    function showTime() {
        var clock = document.getElementById("clock");
        var time = new Date();
        clock.innerHTML = time.toLocaleTimeString();
        setInterval(showTime, 1000);
    }
}