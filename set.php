<?php
require './includes/init.php';

if (!empty($_POST)) {
    if (isset($_POST['key']) && isset($_POST['values']) && isset($_POST['set_id'])) {
        $table_name = 'key_to_values';
        $values = explode(";", $_POST['values']);
        $values = array_map('trim', $values);
        $data = array('set_id' => $_POST['set_id'], 'key' => $_POST['key'], 'values' => json_encode($values));
        Db::insert($table_name, $data);
    }
    elseif (isset($_POST['new_set'])) {
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
        //if nothing's set in get
        if (empty($_GET)) {

            echo "<div class='heading'><h1>view</h1></div>";
            echo "<ul>";
            $set_names = Db::queryAll("SELECT * FROM set_names");
            foreach ($set_names as $set) {
                echo "<a class='set-tile' href='set.php?view_id=" . urlencode($set['id']) ."'><li>" . $set['set_name'] . "</li></a>";
            }
            echo "</ul>";
            echo '<div class="subheading">
            <h2>create your own set</h2>
            <a href="set.php?add_set"><span class="plus-set"></span></a>
            </div>';
        } elseif (isset($_GET['view_id'])){
            $set_id = $_GET['view_id'];
            $set = Db::queryOne("SELECT * FROM set_names WHERE id=?", $set_id);
            $pairs = Db::queryAll("SELECT * FROM key_to_values WHERE set_id=?", $set_id);

            echo "<div class='heading'><h1>" . $set['set_name'] . "</h1></div>";


            ?>
            <!-- HERE GOES THE VIEW STUFF -->
            <!-- now dummy data for view action-->
            <table>
                <tr>
                    <th>Key</th>
                    <th>Values</th>
                </tr>
                <tr>
                    <td class="key"><span class="key-cell">Master<span></td>
                    <td class="value">
                        <span class="value-cell">Elodin</span>
                        <span class="value-cell">Elodin</span>
                        <span class="add-value" data-keyId="x"></span>
                    </td>
                </tr>
                <!-- ... and then the last cell -->
                <tr>
                    <td class="key">
                        <a id="addKey">
                            <span class="add-key"></span>
                            <span class="add-key-text">add key</span>
                        </a>
                    </td>
                    <td class="value"></td>
                </tr>
            </table>
        <?php
        } elseif (isset($_GET['add_set'])) { ?>
            <div class="heading">
                <h2>enter set name</h2>
            </div>
            <form class="add-set" action="" method="post">

            <input type="text" name="new_set">
            <input type="submit" value="submit">

            </form>
        <?php
        }

        ?>

           <!--  <form action="" method="post">

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