<?php
require 'Db.php';
try {
	Db::connect('localhost', 'learn', 'root', '');
} catch (Exception $e) {
	echo "database connection error";
}
?>