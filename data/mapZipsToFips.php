<?php
$map = json_decode(file_get_contents('http://mavericklee.com/assets/data/FIPS_to_ZIPS.json'), true);
$olddata = file_get_contents('php://stdin');

$results = [];
$lines = explode("\n", $olddata);

$header = array_shift($lines);
$doAvg = [];
$fipsCnt = [];
list($zip, $fields) = explode(',', $header, 2);
$header = $fields;
foreach (explode(',', $fields) as $i => $field) {
    if(in_array(strtolower($field), ['median','avg','average'])) {
        $doAvg[] = $i;
        $fipsCnt[$i] = [];
    }
}

foreach ($lines as $line) {
    if(empty($line)) continue;
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

                if (in_array($i, $doAvg)) {
                    if (!isset($fipsCnt[$i][$mapFips])) {
                        $fipsCnt[$i][$mapFips] = 1;
                    } else {
                        $fipsCnt[$i][$mapFips]++;
                    }
                }

                $thisResult[$i] += $datum;
            }

            $results[$mapFips] = implode(',', $thisResult);
        }
    }
}

foreach ($doAvg as $k => $i) {
    foreach ($fipsCnt[$i] as $mapFips => $n) {
        $data = explode(',', $results[$mapFips]);
        $data[$i] = (int)($data[$i] / $n);
        $results[$mapFips] = implode(',', $data);
    }
}

echo "fips,{$header}\n";
foreach ($results as $fips => $data) {
    echo preg_replace('/^0+/', '', $fips) . ",{$data}\n";
}
