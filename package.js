Package.describe({
  summary: "Some optimized mathematical operations for your meteor packages",
  version: "0.0.1",
  git: "https://github.com/flowkey/math-tools.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.1');
  api.addFiles('flowkey:math-tools.js','client');
  api.add_files(['flashsort.js'], 'client');

    api.export(['zArray',
     'getMaxOfArray',
     'copyArray',
     'getMinOfArray',
     'getSumOfArray',
     'getBin',
     'getFreq',
     'mean',
     'median',
     'variance',
     'standardDeviation',
     'createLinearSpace']);
});
