Package.describe({
  summary: "Some optimized mathematical operations for your meteor packages",
  version: "0.0.9.1",
  git: "https://github.com/flowkey/math-tools.git"
});

Package.onUse(function(api) {
  api.addFiles('flowkey:math-tools.js','client');
  api.add_files(['flashsort.js'], 'client');

    api.export([
     'zArray',
     'getMinMaxFromMatrix',
     'linearToDecibel',
     'decibelToLinear',
     'getRmsOfArray',
     'getMaxOfArray',
     'copyArray',
     'getMinOfArray',
     'getSumOfArray',
     'getAbsSumOfArray',
     'centToFrequencyRatio',
     'frequencyRatioToCent',
     'midiToFrequency',
     'frequencyToMidi',
     'calculateBinFromFrequency',
     'calculateFrequencyFromBin',
     'getBin',
     'flashsort',
     'getFreq',
     'mean',
     'median',
     'firstQuartile',
     'thirdQuartile',
     'interQuartileRange',
     'variance',
     'standardDeviation',
     'isLocalExtreme',
     'createLinearSpace',
     'calculateMappingElementCountVector']);
});
