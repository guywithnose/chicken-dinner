<?php

header('Content-Type: text/csv');

$issues = json_decode(file_get_contents('issues.json'), true);
$issueId = $issues[$_GET['class']][$_GET['make']];

$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, "https://robertbittle.bug.ly/v1/issues/{$issueId}");
curl_setopt($curl, CURLOPT_USERPWD, 'jnXe3nLkszjhYG1t2B7WcrGhMlnuVn:');
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$results = json_decode(curl_exec($curl), true);

curl_close($curl);

echo $results['body'];
