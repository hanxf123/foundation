/*
* promise的错误需要通过回调函数捕获
* generator和async/await可以通过try/catch捕获
* */

// 接受一个函数作为参数
function MyPromise (executor) {
  this.value = null; // 成功的值
  this.reason = null; // 失败的原因
  this.status = 'pending'; // 默认状态
  this.onResolvedQueue = [];
  this.onRejectedQueue = [];
  let self = this;
  function resolve (value) {
    if(self.status!=='pending') {
      return
    }
    self.status = 'resolved';
    self.value = value;
    self.onResolvedQueue.forEach(resolved => resolved(self.value))
  }
  function reject (reason) {
    if(self.status!=='pending') {
      return
    }
    self.status = 'rejected';
    self.reason = reason;
    self.onRejectedQueue.forEach(rejected => rejected(self.value))
  }
  executor(resolve, reject);
}
MyPromise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
      return reject(new Error('死循环'))
    }
    if(x != null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then;
        if(typeof then === 'function') {
          then.call(x, function (value) {
            resolvePromise(x,value,resolve,reject)
          }, function (reason) {
            reject(reason)
          })
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(x)
    }
  }
  function handleByStatus(fn, d, resolve, reject) {
    return setTimeout(() => {
      try {
        let x = fn(d)
        resolvePromise(promise2, x, resolve, reject)
      } catch (e) {
        reject(e)
      }
    })
  }
  let promise2 = new MyPromise((function (resolve, reject) {
    if(typeof onResolved !== 'function') {
      onResolved = function (value) {
        return value
      }
    }
    if(typeof onRejected !== 'function') {
      onRejected = function (reason) {
        return reason
      }
    }
    if(self.status === 'resolved') {
      handleByStatus(onResolved, self.value, resolve, reject)
    }
    if(self.status === 'rejected') {
      handleByStatus(onRejected, self.reason, resolve, reject)
    }
    if(self.status === 'pending') {
      self.onResolvedQueue.push(() => {
        handleByStatus(onResolved, self.value, resolve, reject)
      })
      self.onRejectedQueue.push(() => {
        handleByStatus(onRejected, self.reason, resolve, reject)
      })
    }
  }))
  return promise2;
}
new Promise((resolve, reject) => {

}).then((res) => {})