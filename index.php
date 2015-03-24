
<!DOCTYPE html>
<html>
<head>
    <title>Learn</title>
    <meta charset="UTF-8">

    <link rel="stylesheet" href="./css/style.css" media="screen" type="text/css" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>

    <script src="./js/build/application.min.js"></script>
</head>
<body id="learn">
    <nav>
        <ul>
            <a href="index.php" class="logo"><li>learn</li></a>
            <a href="upload.php"><li>upload</li></a>
        </ul>
    </nav>
    <main class="content">
        <div id="pair-list">
            <ul id="leftcol"></ul>
            <ul id="rightcol"></ul>
        </div>
        <div class="controls">
            <button onclick="generatePairs()" id="startbutton">start</button>
            <button onclick="checkPairs()" id="checkbutton">check</button>
        </div>
    </main>
</body>
</html>