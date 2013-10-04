<?php
$map = json_decode(file_get_contents('http://mavericklee.com/assets/data/FIPS_to_ZIPS.json'), true);
$olddata = file_get_contents('php://stdin');

$results = [];
foreach(explode("\n", $olddata) as $line) {
    list($zip, $data) = explode(',', $line, 2);
    foreach ($map as $mapFips => $mapZips) {
        if (in_array($zip, $mapZips)) {
            if (!array_key_exists($mapFips, $results)) {
                $results[$mapFips] = "";
            }

            $thisResult = explode(',', $results[$mapFips]);

            foreach (explode(',', $data) as $i => $datum) {
                if (!array_key_exists($i, $thisResult)) {
                    $thisResult[$i] = 0;
                }

                $thisResult[$i] += $datum;
            }

            $results[$mapFips] = implode(',', $thisResult);
        }
    }
}

echo "fips,data\n";
foreach ($results as $fips => $data) {
    echo preg_replace('/^0+/', '', $fips) . ",{$data}\n";
}
