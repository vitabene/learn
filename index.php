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
    <main class="main">
        <section class="connect">
            <div class="heading">
                <h1>connect the dots</h1>
            </div>
            <ul>
                <?php
                $set_names = Db::queryAll("SELECT * FROM set_names");
                foreach ($set_names as $set):?>
                    <a class='set-tile' href=<?php echo "'connect.php?id=" . urlencode($set['id']) . "'"?>><li><?php echo $set['set_name'] ?></li></a>
                <?php endforeach; ?>
            </ul>
        </section>
        <section class="outline">
            <div class="heading">
                <h1>memorize the outline</h1>
            </div>
            <ul>
                <?php
                $set_names = Db::queryAll("SELECT * FROM outlines");
                foreach ($set_names as $set): ?>
                    <a class='set-tile' href=<?php echo "'outline.php?id=" . urlencode($set['id']) . "'"?>><li><?php echo $set['name'] ?></li></a>
                <?php endforeach; ?>
            </ul>
        </section>
        <div class="subheading">
            <h2>create your own set</h2>
            <a href="set.php?add_set"><span class="plus-set"></span></a>
        </div>

    </main>

</body>
</html>