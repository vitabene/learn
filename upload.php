<?php
require './includes/init.php';

if ($_POST) {
    if ($_POST['key'] && $_POST['value'] && $_POST['set_name']) {
        $table_name = 'key_to_values';
        $data = array('set_name' => $_POST['set_name'], 'key' => $_POST['key'], 'values' => $_POST['value']);
        Db::insert($table_name, $data);
    }
    if ($_POST['new_set']) {

    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Learn</title>
    <meta charset="UTF-8">

    <link rel="stylesheet" href="./css/style.css" media="screen" type="text/css" />
    <link href='http://fonts.googleapis.com/css?family=Titillium+Web' rel='stylesheet' type='text/css'>

    <script src="./js/build/application.min.js"></script>
</head>
<body id="learn">
    <nav>
        <ul>
            <a href="index.php"><li>Learn</li></a>
            <a href="upload.php"><li>upload</li></a>
        </ul>
    </nav>
    <main class="content">
        <div id="pair-list">
            <form action="" method="post">
                <label for="new_set">New set name:</label>
                <input type="text" name="new_set">
                <input type="submit" value="submit new set">

                <br>
                <br>

                <label for="key">New key value pair:</label>
                <select name="set_name">
                    <?php
                    $set_names = Db::queryAll('SELECT DISTINCT set_name FROM set_names');
                    foreach ($set_names as $set) {
                        echo "<option value='" . $set['id'] . "'>" . $set['set_name'] . "</option>";
                    }
                    ?>
                </select>

                <input type="text" name="key">
                <input type="text" name="value">
                <input type="submit" value="submit">

            </form>
        </div>
    <!--     <div class="controls">
            <button onclick="generatePairs()" id="startbutton">start</button>
            <button onclick="checkPairs()" id="checkbutton">check</button>
        </div> -->
    </main>
</body>
</html>