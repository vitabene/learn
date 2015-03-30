<?php
require './includes/init.php';

if (isset($_POST['num_of_mistakes']) && $_POST['num_of_pairs'] && $_POST['time'] && $_POST['set_id']) {
	// echo $_POST['json_mistakes'];
	$mistakes = intval($_POST['num_of_mistakes']);
	$pairs = intval($_POST['num_of_pairs']);
	$score = (1 - round($mistakes/$pairs, 2))*100;
	$set_id = intval($_POST['set_id']);

	$time = intval($_POST['time']);
	//formatting time string
	if ($time > 3600) $time = floor($time/3600) . " hours " . floor($time % 3600/60) . " min " . ($time % 60) . " seconds";
	elseif ($time == 3600) $time = $time/3600 . " hour";
	elseif ($time < 3600 && $time >= 60) $time = floor($time / 60) . " min " . $time % 60 . " s";
	elseif ($time < 60) $time = $time . " s";
} else {
	header('Location: index.php');
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Learn - home</title>
    <?php require 'includes/head.php'; ?>

</head>
<body id="learn">
    <nav>
        <?php require 'includes/nav.php'; ?>
    </nav>

    <main class="content">
		<div class="results">
			<div class="heading">
				<h1>your results</h1>
			</div>
			<h2 class="percent-score"><?php echo $score . " %" ?></h2>
			<h3 class="score"><?php echo ($pairs - $mistakes) . " / " . $pairs; ?></h3>
			<p class="time"><?php echo "your time: " . $time; ?></p>
			<!-- table with mistakes -->
			<div class="buttons">
				<a href="upload.php"><button class="view-set">view set</button></a>
				<a <?php echo "href='practice.php?id=" . $set_id . "'"; ?>><button class="practise-again">practise again</button></a>
			</div>
			<!-- per-set progress chart -->
		</div>
    </main>

</body>
</html>