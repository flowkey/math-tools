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

getAbsSumOfArray = function(numArray){
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

getBin = function(p, factor, K, fs) {
    var bin = Math.round(factor * p * K / fs);
    return bin;
}


getFreq = function(bin, K, fs) {
    var freq = fs / K * bin
    return freq;
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


zArray = function(length) {
    var zArray = new Array(length);
    var zLength = length;
    while (zLength--) {
        zArray[zLength] = 0;
    }
    return zArray;
}