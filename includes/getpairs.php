<?php
require './init.php';

$set_id = intval($_GET['id']);
$rows = Db::queryAll('SELECT * FROM key_to_values WHERE set_id=?', $set_id);
if (empty($rows)) {
	header('Location: ../index.php');
	exit();
}
$array_to_encode = [];
foreach ($rows as $keyvaluepair) {
	$array_to_encode[$keyvaluepair['key']] = json_decode($keyvaluepair['values']);
}
echo json_encode($array_to_encode);
?>