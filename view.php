<?php
require './includes/init.php';

if ($_POST) {
    if ($_POST['key'] && $_POST['values'] && $_POST['set_id']) {
        $table_name = 'key_to_values';
        $values = explode(";", $_POST['values']);
        $values = array_map('trim', $values);
        $data = array('set_id' => $_POST['set_id'], 'key' => $_POST['key'], 'values' => json_encode($values));
        Db::insert($table_name, $data);
    }
    if ($_POST['new_set']) {
        $table_name = 'set_names';
        $data = array('set_name' => $_POST['new_set']);
        Db::insert($table_name, $data);
    }
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Learn</title>
    <?php require 'includes/head.php'; ?>
</head>

<body id="learn">
    <nav>
        <?php require 'includes/nav.php'; ?>
    </nav>

    <main class="main view">
        <?php
        if (!isset($_GET['id'])) {
            echo "<div class='heading'><h1>choose a set to view</h1></div>";
            echo "<ul>";
            $set_names = Db::queryAll("SELECT * FROM set_names");
            foreach ($set_names as $set) {
                echo "<a class='set-tile' href='view.php?id=" . urlencode($set['id']) ."'><li>" . $set['set_name'] . "</li></a>";
            }
            echo "</ul>";
        } else {
            $set_id = $_GET['id'];
            $set = Db::queryOne("SELECT * FROM set_names WHERE id=?", $set_id);
            $pairs = Db::queryAll("SELECT * FROM key_to_values WHERE set_id=?", $set_id);

            echo "<div class='heading'><h1>" . $set['set_name'] . "</h1></div>";


            ?>
            <!-- HERE GOES THE VIEW STUFF -->
            <!-- now dummy data -->
            <table>
                <tr>
                    <th>Key</th>
                    <th>Values</th>
                </tr>
                <tr>
                    <td class="key"><span data-id="">Master<span></td>
                    <td class="value"><span data-key="value-index">Elodin<span><a><span class="plus"></span></a></td>
                </tr>
            </table>
        <?php } ?>
           <!--  <form action="" method="post">
                <label for="new_set">New set name:</label>
                <input type="text" name="new_set">
                <input type="submit" value="submit new set">

                <br>
                <br>

                <label for="key">New key value pair:</label>
                <select name="set_id">
                    <?php
                    $set_names = Db::queryAll('SELECT * FROM set_names');
                    foreach ($set_names as $set) {
                        echo "<option value='" . $set['id'] . "'>" . $set['set_name'] . "</option>";
                    }
                    ?>
                </select>

                <input type="text" name="key">
                <input type="text" name="values">
                <input type="submit" value="submit">

            </form> -->
        </main>
    </body>
    </html>