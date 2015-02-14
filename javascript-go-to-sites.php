<!DOCTYPE html>
<html>
<head>
    <title></title>
    <?php require 'includes/head.php'; ?>


    <style>

    </style>
</head>
<body>
<?php echo "<a href='" . $_SERVER["HTTP_REFERER"] . "' id='backbutton'>back</a>" ?>
<ul>
    <li><a href="">https://developer.mozilla.org</a></li>
    <li><a href="">http://msdn.microsoft.com</a></li>
    <li><a href="">http://developer.apple.com/safari</a></li>
    <li><a href="">http://code.google.com/doctype</a></li>
    <li><a href="">http://en.wikipedia.org/wiki/Comparison_of_layout_engines_(HTML_5)</a></li>
    <li><a href="" id="test">http://en.wikipedia.org/wiki/Comparison_of_layout_engines_(Document_Object_Model)</a></li>
    <li><a href="">http://a.deveria.com/caniuse</a></li>
    <li><a href="">http://www.quirksmode.org/dom</a></li>
    <li><a href="">http://webdevout.net/browser-support</a></li>
</ul>
<p></p>
<script>
    // location = "clock.html";
    // history.go(-1);
    // document.write(navigator.userAgent);
    // document.write("<br>" + screen.width + " " + screen.height + " " + screen.availHeight + " " + screen.availWidth);
    // var $ = function(id) { return document.getElementById(id); };
    // document.firstChild.firstChild.nextSibling.nodeValue = "Next";
    // var li = document.getElementsByTagName("ul").firstChild.firstChild;
    // li.innerHTML = "red";
    // var sparklines = document.getElementsByClassName("sparkline");
    var firstLi = document.getElementById("test");
    // li.innerHTML = li.outerHTML;
    // var firstLi = document.getElementsByTagName("a")[0];
    // firstLi.innerHTML = "Nic";
    var newnode = document.createElement("li");
    newnode.innerHTML = "new node!";
    // firstLi.appendChild(newnode);
    firtstLi.parentNode.insertBefore(newnode, firstLi);
</script>
</body>
</html>
