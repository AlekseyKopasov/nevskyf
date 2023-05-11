<?php
$answers = array(
  'success' => 0,
  'existUser' => 1,
  'unknown' => 2
);
// добавить запись
//INSERT INTO testk2 (lastname, firstname) VALUES ('u_lastname_4', 'u_name_4');

// проверить наличие записи в бд(возвращает к-во строк)
// SELECT COUNT(1) FROM testk2 WHERE lastname='u_lastname_4';

$post = file_get_contents("php://input");
$pathToJson = 'user.json';
file_put_contents($pathToJson, $post);

if (isset($post) and !empty($post)) {
// подкдючиться к nevsky2023
// добавить все привилегии для nevsky2023
// GRANT ALL PRIVILEGES ON TABLE testk2 TO nforum;
  $host = 'science.spb.ranepa.ru';
  $db   = 'nevsky2023';
  $user = 'nforum';
  $pass = 'wvnLyDGxI2Zk8VqzS83W';
  $dbTable = 'registr';

  $data = json_decode($post, true);

  $date = date('m/d/y');
  $email = $data['email'];

  $arr = array('registration_date' => $date);

  function mb_ucfirst($str, $encoding = "UTF-8", $lower_str_end = false) {
    $first_letter = mb_strtoupper(mb_substr($str, 0, 1, $encoding), $encoding);
    $str_end = "";
    if ($lower_str_end) {
      $str_end = mb_strtolower(mb_substr($str, 1, mb_strlen($str, $encoding), $encoding), $encoding);
    }
    else {
      $str_end = mb_substr($str, 1, mb_strlen($str, $encoding), $encoding);
    }
    $str = $first_letter . $str_end;
    return $str;
  }

  foreach ($data as $key => $value) {
    if ($key == 'firstname' or $key == 'lastname' or $key == 'surname') {
      $value = mb_ucfirst($value);
    }

    if ($key == 'role1' and $value != 'Другое (указать)') {
      $key = 'user_role';
      $arr[$key] = $value;
    }

    if ($key == 'role2') {
      $key = 'user_role';
      $arr[$key] = $data['role2'];
    }

    if ($value === 'on') {
      $value = true;
    }

    if (strpos($value, 'июня')) {
      $value = true;
    }

    $sDate = $key;

    $arr[$key] = htmlspecialchars(trim($value));
    unset($arr['role1']);
    unset($arr['role2']);

    if (!isset($arr['date21'])) {
      if (strpos("$key", '21')) {
        unset($arr[$key]);
      }
    }

    if (!isset($arr['date22'])) {
      if (strpos("$key", '22')) {
        unset($arr[$key]);
      }
    }

    if (!isset($arr['date23'])) {
      if (strpos("$key", '23')) {
        unset($arr[$key]);
      }
    }
  }

  try {
    $dsn = "pgsql:host=$host;dbname=$db";
    $opt = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $pdo = new PDO($dsn, $user, $pass, $opt);
  } catch (PDOException $e) {
      echo $answers['unknown'];
      die('Подключение не удалось: ' . $e->getMessage());
  }

  $sqlCheckExectUser = "SELECT * FROM $dbTable WHERE email=:email";
  $stmt = $pdo->prepare($sqlCheckExectUser);
  $stmt->execute(['email' => $email]);
  $isExectUser = $stmt->fetch();

  if ($isExectUser) {
    echo $answers['existUser'];
  } else {
    $prep = array();
    foreach($arr as $k => $v ) {
        $prep[':'.$k] = $v;
    }
    $sth = $pdo->prepare("INSERT INTO $dbTable ( " . implode(', ',array_keys($arr)) . ") VALUES (" . implode(', ',array_keys($prep)) . ")");
    $res = $sth->execute($prep);
    // отправить уведомление о регистрации на почту
    echo $answers['success'];
  }
} else {
  echo $answers['unknown'];
}
?>
