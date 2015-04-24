<?php
require './includes/init.php';

if (isset($_GET['id']) && Db::query("SELECT * FROM set_names WHERE id=?", $_GET['id'])) {

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

    <main class="main practice">
        <div class="heading">
        <h2>Are you ready?</h2>
        </div>
        <div id="pair-list" <?php echo "data-set='" . urlencode($_GET['id']) . "' "; ?>>
            <ul id="leftcol"></ul>
            <ul id="rightcol"></ul>
        </div>
    </main>

    <script src="./js/build/connect.js"></script>
</body>
</html>
<?php } else {
    header('Location: index.php');
}
?>