<?php
session_start();
require 'Db.php';
try {
	Db::connect('localhost', 'learn', 'root', '');
} catch (Exception $e) {
	echo "database connection error";
}
$error = "";
?>