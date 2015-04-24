<?php
require './includes/init.php';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Learn - home</title>
    <?php require 'includes/head.php'; ?>
    <!-- jquery + jquery ui -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
</head>
<body id="order">
    <nav>
        <?php require 'includes/nav.php'; ?>
    </nav>

    <main class="main">
		<ul id="sortable" <?php echo "data-set='" . urlencode($_GET['id']) . "' "; ?>>
		</ul>
		<button class="check">check</button>
    </main>
	<script src="./js/build/outline.js"></script>
</body>
</html>