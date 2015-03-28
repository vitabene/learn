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
    <?php if (isset($_GET['id']) && Db::query("SELECT * FROM set_names WHERE id=?", $_GET['id'])) {
        ?>
            <div id="pair-list">
                <ul id="leftcol"></ul>
                <ul id="rightcol"></ul>
            </div>
            <div class="controls">
                <button id="startbutton" <?php echo "data-set='" . urlencode($_GET['id']) . "'"; ?>>start</button>
                <button id="checkbutton">check</button>
            </div>
    <?php
        } else {
            echo "<ul>";
            $set_names = Db::queryAll("SELECT * FROM set_names");
            foreach ($set_names as $set) {
                echo "<a href='?id=" . urlencode($set['id']) ."'><li>" . $set['set_name'] . "</li></a>";
            }

            echo "</ul>";
        }
    ?>
    </main>

</body>
</html>