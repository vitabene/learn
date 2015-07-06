<?php
require './includes/init.php';

if (!empty($_POST)) {
    $error = "";
    //adding new key with value
    if (!empty($_POST['key_name']) && !empty($_POST['values_for_key']) && !empty($_POST['set_id'])) {
        $table_name = 'key_to_values';
        $set_id = $_POST['set_id'];
        $key = $_POST['key_name'];
        $values = explode(";", $_POST['values_for_key']);
        $values = array_map('trim', $values);

        $existing_pairs = Db::queryAll("SELECT * FROM " . $table_name . " WHERE set_id=?", $set_id);

        $keys = array();
        for ($i = 0; $i < sizeof($existing_pairs); $i++) {
            $keys[$i] = $existing_pairs[$i]["key"];
        }

        $key_index = array_search($key, $keys);

        if ($key_index === FALSE) {
            $data = array('set_id' => $set_id, 'key' => $key, 'values' => json_encode($values));
            Db::insert($table_name, $data);
        } else {
            //get row
            $row = $existing_pairs[$key_index];
            //get existing values
            $existing_values = json_decode($row['values']);
            //the value already exists, return
            $original_size = sizeof($values);
            for ($i = 0; $i < $original_size; $i++) {
                if (in_array($values[$i], $existing_values, true)) {
                    unset($values[$i]);
                }
            }
            if (sizeof($values) !== 0) {
                //join to new values
                $data = array('values' => json_encode(array_merge($values, $existing_values)));
                //update
                $where_condition = "WHERE id=". $row['id'];
                Db::update($table_name, $data, $where_condition);
            } else {
                $error = 'All values for selected key already exist';
            }
        }
    }
    //adding new set
    elseif (isset($_POST['new_set']) && !empty($_POST['new_set'])) {
        $set_name = $_POST['new_set'];
        $table_name = 'set_names';
        $data = array('set_name' => $set_name);
        $set_exists = Db::query("SELECT * FROM " . $table_name . " WHERE set_name=?", $set_name);
        if (!$set_exists) {
            Db::insert($table_name, $data);
            unset($_GET['add_set']);
        } else {
            $error = "set under that name already exists";
        }
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
    if (empty($_GET)) { ?>
        <div class='heading'>
            <h1>view</h1>
        </div>
        <ul>
            <?php
            $set_names = Db::queryAll("SELECT * FROM set_names");
            foreach ($set_names as $set) {
            ?>
                <a class='set-tile' href=<?php echo "'set.php?view_id=" . urlencode($set['id']) ."'" ?>><li><?php echo $set['set_name'] ?></li></a>
            <?php
            }
            ?>
        </ul>
        <div class="subheading">
        <h2>create your own set</h2>
        <a href="set.php?add_set">
            <span class="plus-set"></span>
        </a>
    </div>
    <?php } elseif (!empty($_GET['view_id'])) {
        $set_id = $_GET['view_id'];
        $set = Db::queryOne("SELECT * FROM set_names WHERE id=?", $set_id);
        $pairs = Db::queryAll("SELECT * FROM key_to_values WHERE set_id=?", $set_id);
        ?>
        <div class='heading'>
            <h1><?php echo $set['set_name'] ?></h1>
        </div>
        <table id='pair-table'>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Values</th>
                </tr>
            </thead>
            <tbody>
        <?php
        foreach ($pairs as $keyvaluepair) {
            $values_array = json_decode($keyvaluepair['values']);
            ?>
            <tr>
                <td class="key-td"><span class="key-cell"><?php echo $keyvaluepair['key'] ?><span></td>
                <td class="value-td">
                    <?php
                    foreach ($values_array as $value) {?>
                        <span class="value-cell"><?php echo $value ?></span>
                    <?php } ?>
                    <span class="add-value" data-key=<?php echo "'" . $keyvaluepair['key'] . "'"?>data-set-id=<?php echo "'" . $set_id . "'"?>></span>
                </td>
            </tr>
            <?php } ?>
            <tr>
                <td class="key-td">
                    <a id="addKey" data-set-id=<?php echo "'" . $set_id . "'" ?>>
                        <span class="plus-key"></span>
                    </a>
                </td>
                <td class="value-td"></td>
            </tr>
            </tbody>
        </table>
    <?php } elseif (isset($_GET['add_set'])) { ?>
    <div class="heading">
        <h2>enter set name</h2>
    </div>
    <form class="add-set" action="" method="post">
        <input type="text" name="new_set">
        <input type="submit" value="submit">
    </form>
    <?php
    }
    if (!empty($error)) {
        $error = ""; ?>
        <div class='heading'>
            <h4>
                <?php echo $error ?>
            </h4>
        </div>
        <?php
    }
    ?>
</main>
<script src="js/view.js"></script>
</body>
</html>