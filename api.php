<?php
include 'db.config';

$res = ['error' => false];


if(isset($_GET['action'])){
    $action = $_GET['action'];
//Read Data via Vue js
if($action == 'read'){
    $d = new Database();
    $r = $d->Read("users", ["id", "ASC"]);
    $users=array();

    while ($row = $r->fetch_assoc()) {
        array_push($users, $row);
    }
    $res['users'] = $users;
}
//Create Data via Vue js
if($action == 'create'){

    if(empty($_POST['username'] && $_POST['email'] && $_POST['mobile'])){

        $res['error'] = true;
        $res['message'] = "Something Wrong!";

    } else {
        
        $data = [
            'username' => $_POST['username'],
            'email' => $_POST['email'],
            'mobile' => $_POST['mobile']
        ];

        $d = new Database();
        if($d->Insert("users", $data)){
            $res['message'] = "User Added Successfully";
        }else {
            $res['error'] = true;
            $res['message'] = "Something Wrong!";
        }
    } 
}

//Update Data via Vue js
if($action == 'update'){
    if(empty($_POST['username'] && $_POST['email'] && $_POST['mobile'])){

        $res['error'] = true;
        $res['message'] = "Something Wrong!";

    }else {
        $id = $_POST['id'];
        $data = [
            'username' => $_POST['username'],
            'email' => $_POST['email'],
            'mobile' => $_POST['mobile']
        ];

        $d = new Database();
        if($d->Update("users", $data, array("id", $id))){
            $res['message'] = "User Update Successfully";
        }else {
            $res['error'] = true;
            $res['message'] = "Something Wrong!";
        }
    }
}

//Delete Data via Vue js
if($action == 'delete'){
    $id = $_POST['id'];

    $d = new Database();
    if($d->Delete("users", array("id", $id))){
        $res['message'] = "User Delete Successfully";
    }else {
        $res['error'] = true;
        $res['message'] = "Something Wrong!";
    }
}

}

header("Content-type: application/json");
echo json_encode($res);