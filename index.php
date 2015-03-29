<?php
require './includes/init.php';
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
        <div class="heading">
            <h1>choose a set to practise</h1>
        </div>
        <?php

        echo "<ul>";
        $set_names = Db::queryAll("SELECT * FROM set_names");
        foreach ($set_names as $set) {
            echo "<a class='set-tile' href='practice.php?id=" . urlencode($set['id']) ."'><li>" . $set['set_name'] . "</li></a>";
        }
        echo "</ul>";

        ?>
        <div class="heading">
            <a href="upload.php"><h2>or create your own</h2></a>
        </div>
    </main>

</body>
</html>