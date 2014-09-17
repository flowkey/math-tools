Package.describe({
  summary: "Some optimized mathematical operations for your meteor packages",
  version: "0.0.3",
  git: "https://github.com/flowkey/math-tools.git"
});

Package.onUse(function(api) {
  api.addFiles('flowkey:math-tools.js','client');
  api.add_files(['flashsort.js'], 'client');

    api.export(['zArray',
     'getMaxOfArray',
     'copyArray',
     'getMinOfArray',
     'getSumOfArray',
     'getBin',
     'flashsort',
     'getFreq',
     'mean',
     'median',
     'variance',
     'standardDeviation',
     'createLinearSpace']);
});
