<!DOCTYPE html>
<html>
<head>
    <title>Tetris</title>
    <meta name="author" content="Veljko Maksimovic" />
    <meta charset="utf-8" />
    <meta name="description" content="Javascript assignment." />
    <link rel="stylesheet" href="tetris1.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> 
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet"/>
    <script src="tetris.js"></script>
</head>
<body>
    <h1 style="font-size:70px">TETRIS</h1>


    <div style = "text-align:center; margin-top: 3%">
        <b>Choose difficulty: </b> <br>
    <button id="pocetak1" onClick = "primer();" class="btn btn-outline-warning" style="background-color:black">Normal</button>
    <button id="pocetak2" onClick = "primer1();" class="btn btn-outline-warning" style="background-color:black" >Hard</button>
    </div>


</body>
</html>