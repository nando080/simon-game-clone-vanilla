/* let num = 1
const func = () => {
        console.log(num)
        num++
    return
}

var setIntervalSynchronous = function (func, delay) {
    var intervalFunction, timeoutId, clear;
    // Call to clear the interval.
    clear = function () {
      clearTimeout(timeoutId);
    };
    intervalFunction = function () {
      if (num <= 10) {
        func();
      } else {
          clear()
          return
      }
      timeoutId = setTimeout(intervalFunction, delay);
    }
    // Delay start.
    timeoutId = setTimeout(intervalFunction, delay);
    // You should capture the returned function for clearing.
  };



 const teste = setIntervalSynchronous(func, 300)
 */