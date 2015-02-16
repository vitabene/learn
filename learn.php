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
    	<!--
    	okay punk, that's adding a pair, not that it works anyway
    	let's now work with the assumption that I do have some pairs already defined and need to program the actual mechanism
    	-->
    	<div class="controls">
    		<input type="text" name="pairKey" value="tyrion" autocomplete="off">
    		<input type="text" name="pairValue" value="lannister"  autocomplete="off">
    		<button onclick="addPair()">save</button>

    		<!-- <label for="num-of-pairs">enter number of pairs for practise</label> -->
    		<input type="number" name="num-of-pairs" value="6" placeholder="5">
    		<button onclick="generatePairs()">set</button>
    	</div>
    	<div class="pair-list">
    		<table id="pair-table"></table>

    		<div class="leftcol">
    			<ul>
    			</ul>
    		</div>

    		<div class="rightcol">
    			<ul>
    			</ul>
    		</div>
    	</div>

	</main>
</body>
</html>