<!DOCTYPE html>
<html>
<head>
    <title>Learn</title>
    <?php require 'includes/head.php'; ?>
    <script src="js/learn.js"></script>
</head>
<body id="learn">
    <?php if (isset($_SERVER["HTTP_REFERER"])) echo "<a href='" . $_SERVER["HTTP_REFERER"] . "' id='backbutton'>back</a>" ?>
    <main>
    	<div class="add-pair">
    		<input type="text" name="pairKey" value="tyrion" autocomplete="off">
    		<input type="text" name="pairValue" value="lannister"  autocomplete="off">
    		<button onclick="savePair()">save</button>
    	</div>
    	<div class="pair-list">
    		<table id="pair-table">
    		</table>
    	</div>
	</main>
</body>
</html>