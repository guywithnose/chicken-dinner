<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="bootstrap-3.0.0/assets/ico/favicon.png">

    <title>DataBake&trade; v0.5</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.0.0/dist/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="jumbotron.css" rel="stylesheet">
    <link href="map.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
<?php include 'nav.php' ?>
    <div class="jumbotron">
    <div class="container">
        
        
        <!----incorrect type ahead/ autocorrect  look ---->
        <div class="input-group input-group-lg">
        <input type="text" value="Enter a keyword" class="form-control" id="searchBarInput" >
        <span class="input-group-btn"><button class="btn btn-primary" type="button">Go!</button></span>
        </div>
        <!---- end incorrect type ahead/ autocorrect  look ---->
        
        <!----correct input look ---->
        <br>
        <div class="input-group input-group-lg">
        <input type="text" value="Enter a keyword" class="form-control">
        <span class="input-group-btn"><button class="btn btn-primary" type="button">Go!</button></span>
        </div>
        <!----end correct look ---->
        
        <!--<select class="main-drop">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> -->
        
        <div id="huge-map" class="huge-map panel"></div>
             
        <a class="btn btn-primary btn-lg" data-toggle="collapse" data-parent="#accordion" href="#collapse-data-more">
        Learn More About This Data
        </a>
        <div id="collapse-data-more" class="collapse">
        <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><a href="detail.php">Detail Page Link</a></td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
        </table>
        </div>
    </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-lg-4">
          <h2>Visualize Data</h2>
          <p>Learn more from your spreadsheets and lists. Make huge data more meaningful. Analyze country wide data in moments.</p>
          <p><a class="btn btn-default" href="#">View details &raquo;</a></p>
        </div>
        <div class="col-lg-4">
          <h2>Target opportunities</h2>
          <p>Zero in on the best salaries, job markets, etc. Find the best place to move your family. Discover where your best client prospects are</p>
          <p><a class="btn btn-default" href="#">View details &raquo;</a></p>
       </div>
        <div class="col-lg-4">
          <h2>Predict new markets</h2>
          <p>Know about new areas to operate first. Spend time in the right places. Understand which direction trends are moving.</p>
          <p><a class="btn btn-default" href="#">View details &raquo;</a></p>
        </div>
      </div>
<?php include 'footer.php' ?>

