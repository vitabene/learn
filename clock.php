<!DOCTYPE html>
<!-- This is an HTML5 file -->
<html>
<!-- The root element -->
<head>
    <!-- Title, scripts & styles go here -->
    <title>Digital Clock</title>
    <?php require 'includes/head.php'; ?>
    <script>
// A script of js code
// Define a function to display the current time
function displayTime() {
var elt = document.getElementById("clock"); // Find element with id="clock"
var now = new Date();
// Get current time
elt.innerHTML = now.toLocaleTimeString();
// Make elt display it
setTimeout(displayTime, 1000);
// Run again in 1 second
}
window.onload = displayTime; // Start displaying the time when document loads.
</script>
</head>
<body>
    <?php echo "<a href='" . $_SERVER["HTTP_REFERER"] . "' id='backbutton'>back</a>" ?>
    <span id="clock"></span>
</body>
</html>