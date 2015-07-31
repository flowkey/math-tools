/*
 * some audio related operations
 */
decibelToLinear = function(decibelValue) {
    return Math.pow(10, (decibelValue * 0.05));
}

linearToDecibel = function(linearValue) {
    return 20 * Math.log(linearValue) / Math.LN10;
}

centToFrequencyRatio = function(cent) {
    return Math.pow(2, cent / 100 / 12);
}

frequencyRatioToCent = function(q) {
    return 1200 * (Math.log(q) / Math.log(2))
}

midiToFrequency = function(n, tuningRef) {
    return (Math.pow(2, (n - 69) / 12) * tuningRef);
}

frequencyToMidi = function(frequency, tuningRef) {
    return Math.round(69 + 12 * Math.log(frequency / tuningRef) / Math.log(2));
}

calculateBinFromFrequency = function(freq, factor, sampleRate, fftSize) {
    var bin = Math.round(factor * freq * fftSize / sampleRate);
    return bin;
}

calculateFrequencyFromBin = function(bin, sampleRate, fftSize) {
    var freq = sampleRate / fftSize * bin
    return freq;
}

// deprectad, use calculateBinFromFrequency
getBin = function(freq, factor, fftSize, sampleRate) {
    console.warn("getBin() is deprecated, use calculateBinFromFrequency() instead");
    var bin = Math.round(factor * freq * fftSize / sampleRate * 2);
    return bin;
}

// deprecated, use calculateFrequencyFrimBin
getFreq = function(bin, K, fs) {
    console.warn("getFreq() is deprecated, use calculateFrequencyFromBin() instead");
    var freq = fs / K * bin
    return freq;
}


/*
 * some operations on arrays
 */
 
zArray = function(length) {
    var zArray = new Array(length);
    var zLength = length;
    while (zLength--) {
        zArray[zLength] = 0;
    }
    return zArray;
}

getMinMaxFromMatrix = function(matrix) {
  var max = -Infinity;
  var min = Infinity
  for (var x = 0; x < matrix.length; x++) {
    var vector = matrix[x];
    for (var y = 0; y < vector.length; y++) {
      var value = vector[y];
      if (value > max) max = value;
      if (value < min) min = value;
    }
  }
  return {
    min: min,
    max: max,
  };
}

getRmsOfArray = function(numArray) {
    var rms = 0;
    for (var i = numArray.length - 1; i >= 0; i--) {
        rms += numArray[i] * numArray[i];
    };
    rms = rms / numArray.length;
    rms = Math.sqrt(rms);

    return rms
}

getMaxOfArray = function(numArray) {
    // return Math.max.apply(null, numArray);

    var max = -Infinity;
    for (var i = 0; i < numArray.length; i++) {
        if (max < numArray[i]) {
            max = numArray[i];
        }
    }
    return max;
}

getMinOfArray = function(numArray) {
    // return Math.min.apply(null, numArray);

    var min = +Infinity;
    for (var i = 0; i < numArray.length; i++) {
        if (min > numArray[i]) {
            min = numArray[i];
        }
    }
    return min;
}

getSumOfArray = function(numArray) {
    var sum = 0;
    for (var i = numArray.length - 1; i >= 0; i--) {
        sum += numArray[i];
    };

    return sum;
}

getAbsSumOfArray = function(numArray) {
    var sum = 0;
    for (var i = numArray.length - 1; i >= 0; i--) {
        sum += Math.abs(numArray[i]);
    };

    return sum;
}



copyArray = function(arr) {
    return arr.slice();
}

mean = function(numArray) {
    var sum = 0;
    for (var i = numArray.length - 1; i >= 0; i--) {
        sum += numArray[i];
    }
    var mean = sum / numArray.length;

    return mean;
}

median = function(numArray) {
    // always remember to hard copy the array when flashSorting
    var sortedArray = flashSort(numArray.slice());
    var half = Math.floor(sortedArray.length / 2);
    // if (sortedArray.length % 2)
    if (sortedArray.length & 1)
        return sortedArray[half];
    else
        return (sortedArray[half - 1] + sortedArray[half]) / 2.0;
}

firstQuartile = function(numArray) {
    // always remember to hard copy the array when flashSorting
    var sortedArray = flashSort(numArray.slice());
    var half = Math.floor(sortedArray.length / 2);
    // if (sortedArray.length % 2)
    if (sortedArray.length & 1)
        return sortedArray[half];
    else
        return (sortedArray[half - 1] + sortedArray[half]) * 0.25;
}

thirdQuartile = function(numArray) {
    // always remember to hard copy the array when flashSorting
    var sortedArray = flashSort(numArray.slice());
    var half = Math.floor(sortedArray.length / 2);
    // if (sortedArray.length % 2)
    if (sortedArray.length & 1)
        return sortedArray[half];
    else
        return (sortedArray[half - 1] + sortedArray[half]) * 0.75;
}

interQuartileRange = function(numArray) {
    return thirdQuartile(numArray) - firstQuartile(numArray);
}

variance = function(numArray) {
    // if( !isArray(numArr) ){ return false; }
    var meanValue = mean(numArray),
        i = numArray.length,
        v = 0;
    while (i--) {
        v += Math.pow((numArray[i] - meanValue), 2);
    }
    v /= numArray.length;
    return v;
}

standardDeviation = function(numArray) {
    // if( !isArray(numArr) ){ return false; }
    var stdDev = Math.sqrt(variance(numArray));
    return stdDev;
}

isLocalExtreme = function(findMinimum, numArray, checkPos) {
    return _.reduce(numArray, function(isTrueSoFar, number, i) {

        if (!isTrueSoFar) {
            return false;
        }

        // Avoid array out of bounds:
        if (i == numArray.length - 1) {
            return isTrueSoFar;
        } else if ((findMinimum == true && i < checkPos) || (findMinimum != true && i >= checkPos) == true) {
            // we should be entering a trough, meaning that the
            // volume of next block should be less than the current one:
            return isTrueSoFar && numArray[i + 1] < number;
        } else {
            // we are coming out of the trough, volume should be increasing from here..
            return isTrueSoFar && numArray[i + 1] > number;
        }

    }, true);
}


/*
 * creates an array with the size of n, values linear between a and b
 */
createLinearSpace = function(a, b, n) {
    if (typeof n === "undefined") n = Math.max(Math.round(b - a) + 1, 1);
    if (n < 2) {
        return n === 1 ? [a] : [];
    }
    var i, ret = Array(n);
    n--;
    for (i = n; i >= 0; i--) {
        ret[i] = (i * b + (n - i) * a) / n;
    }
    return ret;
}


/*
 * calculates a mappingElementCountVector for normalizing elements of another vector L, which was mapped from a bigger vector  K
 * (know what I mean?)
 * parameter k: length of vector K
 * parameter l: length of vector L
 */
calculateMappingElementCountVector = function(k, l) {
    var elementCountVector = new Array(l);
    var base = Math.floor(k / l);
    var limit = k - l * (Math.floor(k / l));

    for (var i = 1; i <= l; i++) {
        elementCountVector[i - 1] = base;
        if (i <= limit) {
            elementCountVector[i - 1] += 1;
        }
    };
    return elementCountVector;
}