<?php
require './init.php';

$outline_id = intval($_GET['id']);
$rows = Db::queryAll('SELECT * FROM outline_texts WHERE outline_id=?', $outline_id);
if (empty($rows)) {
	header('Location: ../index.php');
	exit();
}
//do stuff
$array_to_encode = [];
foreach ($rows as $outline_text) {
	$array_to_encode[$outline_text['parent_id']] = $outline_text['text'];
}
echo json_encode($array_to_encode);
?>