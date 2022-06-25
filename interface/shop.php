<?php
  include('./conn.php');

  $idList = $_REQUEST['idList'];

  $sql = "select * from tmall where id in ($idList)";

  $res = $conn->query($sql);

  $arr = [];

  while($row = $res->fetch_assoc()){
    array_push($arr,$row);
  }

  echo json_encode($arr);
?>