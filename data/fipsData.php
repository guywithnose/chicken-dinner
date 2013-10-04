<?php

$file = file_get_contents('US_FIPS_Codes.csv');

$fipsData = explode("\n", $file);
$jsonData = [];
foreach ($fipsData as $fips) {
    if ($fips) {
        $fipsParts = explode(',', $fips);
        $jsonData[$fipsParts[2] . $fipsParts[3]] = ['State' => $fipsParts[0], 'County' => $fipsParts[1]];
    }
}

echo json_encode($jsonData);
