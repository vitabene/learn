<?php
require './includes/init.php';
if (isset($_POST['new_outline']) && !empty($_POST['new_outline'])) {
        $outline_name = $_POST['new_outline'];
        $table_name = 'outlines';
        $data = array('name' => $outline_name);
        $outline_exists = Db::query("SELECT * FROM " . $table_name . " WHERE name=?", $outline_name);
        if (!$outline_exists) {
            Db::insert($table_name, $data);
        } else {
            $error = "outline under that name already exists";
        }
}
if (isset($_POST['parent_text']) && isset($_POST['outline_text'])) {
    $table = 'outline_texts';
    $data = array('outline_id' => $_GET['outline'], 'parent_id' => $_POST['parent_text'], 'text' => $_POST['outline_text']);
    $insert = Db::insert($table, $data);
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

    <main class="main">
        <?php if (isset($_GET['outline'])) { ?>
        <form action="" class="add-outline-text" method="post">
            <select name="parent_text">
                <?php
                $parent = intval($_GET['outline']);
                $texts = Db::queryAll('SELECT * FROM outline_texts WHERE outline_id=?', $parent);
                $text_array = array();
                foreach ($texts as $text) {
                    $item = "<option value='" . $text['id'] . "'>" . $text['text'] . "</option>";
                    array_push($text_array, $item);
                }
                $text_array = array_reverse($text_array);
                foreach ($text_array as $texta) {
                    echo $texta;
                }
                ?>
                <option value="0">-- first item --</option>
            </select>

            <input type="text" name="outline_text">

            <input type="submit" value="add">
        </form>
        <?php } else { ?>
            <form action="" method="get" class="add-outline">
                <select name="outline">
                    <option value="">select outline</option>
                    <?php
                    $outlines = Db::queryAll('SELECT * FROM outlines');
                    foreach ($outlines as $outline) {
                        echo "<option value='" . $outline['id'] . "'>" . $outline['name'] . "</option>";
                    }
                    ?>
                </select>

                <input type="submit" value="add">
            </form>

            <form class="add-outline" action="" method="post">
                <label for="new_outline">new outline:</label>
                <input type="text" name="new_outline">
                <input type="submit" value="submit">

            </form>
        <?php } ?>
    </main>

</body>
</html>