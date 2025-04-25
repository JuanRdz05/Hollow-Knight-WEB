<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuración corregida
$host = "localhost:3306";  // Puerto explícito con dos puntos
$dbname = "progra_web";
$username = "root";
$password = "root";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar campos obligatorios
    $required = ['firstName', 'lastName', 'birthDate', 'username', 'email', 'password'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            die("El campo $field es requerido");
        }
    }

    // Procesar datos
    $nombre = $_POST['firstName'];
    $apellido_paterno = $_POST['lastName'];
    $apellido_materno = !empty($_POST['motherLastName']) ? $_POST['motherLastName'] : ''; // Valor por defecto
    $usuario = $_POST['username'];
    $correo = $_POST['email'];
    $contraseña = password_hash($_POST['password'], PASSWORD_BCRYPT);
    
    // Convertir fecha a DATETIME (como lo espera tu tabla)
    $nacimiento = date('Y-m-d H:i:s', strtotime($_POST['birthDate']));
    
    // Procesar imagen
    $imagen = 'img/default.png';
    if (!empty($_FILES['profileImage']['tmp_name'])) {
        $allowed = ['image/jpeg', 'image/png'];
        if (in_array($_FILES['profileImage']['type'], $allowed)) {
            $ext = pathinfo($_FILES['profileImage']['name'], PATHINFO_EXTENSION);
            $filename = 'user_' . time() . '.' . $ext;
            $target = "../uploads/$filename";
            
            if (!file_exists('../uploads')) {
                mkdir('../uploads', 0777, true);
            }
            
            if (move_uploaded_file($_FILES['profileImage']['tmp_name'], $target)) {
                $imagen = 'uploads/' . $filename;
            }
        }
    }

    try {
        $sql = "INSERT INTO usuarios (
            nombre, 
            apellido_paterno, 
            apellido_materno, 
            correo_electronico, 
            contraseña, 
            usuario, 
            nacimiento, 
            imagen
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            $nombre,
            $apellido_paterno,
            $apellido_materno,
            $correo,
            $contraseña,
            $usuario,
            $nacimiento,
            $imagen
        ]);
        
        header("Location: ../HTML/registro_exitoso.html");

        exit();
    } catch(PDOException $e) {
        $error = "Error al registrar: " . $e->getMessage();
        if ($e->getCode() == '23000') {
            $error = "El usuario o correo ya existe";
        }
        header("Location: registro.html?error=" . urlencode($error));
        exit();
    }
}
?>