<!DOCTYPE html>
<html>
<head>
<title>JS</title>
<style>
/* CSS styles for this page */
.reveal * { display: none; } /* Children of class="reveal" are not shown */
.reveal *.handle { display: block;  cursor: hand;} /* Except for the class="handle" child */
</style>
<script>
// Don't do anything until the entire document has loaded
window.onload = function() {
// Find all container elements with class "reveal"
var elements = document.getElementsByClassName("reveal");
for(var i = 0; i < elements.length; i++) { // For each one...
var elt = elements[i];
// Find the "handle" element with the container
var title = elt.getElementsByClassName("handle")[0];
// When that element is clicked, reveal the rest of the content
title.onclick = function() {
if (elt.className == "reveal") elt.className = "revealed";
else if (elt.className == "revealed") elt.className = "reveal";
}
}
};
</script>
</head>
<body>
<div class="reveal">
<h1 class="handle">Click Here to Reveal Hidden Text</h1>
<p>This paragraph is hidden. It appears when you click on the title.</p>
</div>

</body>
</html>