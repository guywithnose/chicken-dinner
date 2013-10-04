<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="bootstrap-3.0.0/assets/ico/favicon.png">

    <title>DataBake&trade; v0.5</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.0.0/dist/css/bootstrap.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/jumbotron.css" rel="stylesheet">
    <link href="css/map.css" rel="stylesheet">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
    <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />

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

        <!----correct input look ---->
        <div class="input-group input-group-lg">
        <input type="text" value="" placeholder="Enter a keyword" class="form-control" id="keyword">
        <span class="input-group-btn"><button class="btn btn-primary" type="button">Go!</button></span>
        </div>
        <!----end correct look ---->

        <!--<select class="main-drop">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> -->

        <div id="huge-map" class="huge-map panel"><div class="loading">&nbsp;</div></div>

        <a id="tableToggle" class="btn btn-primary btn-lg" data-toggle="collapse" data-parent="#accordion" href="#collapse-data-more">
        Learn More About This Data
        </a>
        <a id="popMap" class="btn btn-primary btn-lg" style="float:right;">
        Compare with population density
        </a>
        <div id="collapse-data-more" class="collapse">
            <div id="dataTable" />
        </div>
    </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-lg-4">
          <h2>Visualize Data</h2>
          <p>Learn more from your spreadsheets and lists. Make huge data more meaningful. Analyze country wide data in moments.</p>
          <p><a class="btn btn-default" href="about.php">View details &raquo;</a></p>
        </div>
        <div class="col-lg-4">
          <h2>Target opportunities</h2>
          <p>Zero in on the best salaries, job markets, etc. Find the best place to move your family. Discover where your best client prospects are</p>
          <p><a class="btn btn-default" href="about.php">View details &raquo;</a></p>
       </div>
        <div class="col-lg-4">
          <h2>Predict new markets</h2>
          <p>Know about new areas to operate first. Spend time in the right places. Understand which direction trends are moving.</p>
          <p><a class="btn btn-default" href="about.php">View details &raquo;</a></p>
        </div>
      </div>
<?php include 'footer.php' ?>

