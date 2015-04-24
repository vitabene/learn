<?php
require './includes/init.php';

function get_time($time) {
	if ($time > 3600) $fmt_time = floor($time/3600) . " hours " . floor($time % 3600/60) . " min " . ($time % 60) . " seconds";
	elseif ($time == 3600) $fmt_time = $time/3600 . " hour";
	elseif ($time < 3600 && $time >= 60) $fmt_time = floor($time / 60) . " min " . $time % 60 . " s";
	elseif ($time < 60) $fmt_time = $time . " s";
	return $fmt_time;
}
$result_mode = '';

if (isset($_POST['num_of_mistakes']) && $_POST['num_of_pairs'] && $_POST['time'] && $_POST['set_id']) {
	$result_mode = "connect";
	$mistakes = intval($_POST['num_of_mistakes']);
	$pairs = intval($_POST['num_of_pairs']);
	$score = (1 - round($mistakes/$pairs, 2))*100;
	$set_id = intval($_POST['set_id']);
	$time = get_time(intval($_POST['time']));

} elseif (isset($_POST['num_of_tries']) && $_POST['time'] && $_POST['set_id']) {
	$result_mode = "outline";

	$num_of_tries = intval($_POST['num_of_tries']);
	$tries = "";
	if ($num_of_tries == 1) {
		$tries = "try";
	} else {
		$tries = "tries";
	}

	$time = get_time(intval($_POST['time']));
	$set_id = intval($_POST['set_id']);
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

    <main class="main results">
			<div class="heading">
				<h1>your results</h1>
			</div>
			<?php if ($result_mode == "connect") { ?>
				<h2 class="percent-score"><?php echo $score . " %" ?></h2>
				<h3 class="score"><?php echo ($pairs - $mistakes) . " / " . $pairs; ?></h3>
				<p class="time"><?php echo "your time: " . $time; ?></p>
			<?php } elseif ($result_mode == "outline") { ?>
				<h2 class="percent-score"><?php echo "it took you  " . $num_of_tries . "  " . $tries ?></h2>
				<p class="time"><?php echo "your time: " . $time; ?></p>
			<?php } ?>

			<!-- table with mistakes -->
			<div class="buttons">
				<!-- <a <?php echo "href='set.php?view_id=" . $set_id . "'"; ?>><button class="view-set">view set</button></a> -->
				<a <?php if ($result_mode == "connect") {
						echo "href='connect.php?id=" . $set_id . "'";
					} elseif ($result_mode == "outline") {
						echo "href='outline.php?id=" . $set_id . "'";
					}
					?>><button class="practise-again">practise again</button></a>
			</div>
			<!-- per-set progress chart -->

    </main>

</body>
</html>