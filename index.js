
module.exports = function (create) {
  var reader = null, aborted = false, abortCb
  return function (read) {
    if('function' !== typeof read) throw new Error('read must be function')
    return function (abort, cb) {
      if(abort) {
        aborted = abort
//        console.log('ABORT', reader)
//        console.log(reader);
        if(reader && reader.abort) {
          console.log('abort sink')
          reader.abort(abort, cb)
        }
        else {
          console.log('ABORT READ IMMEDIATELY')
          read(abort, cb)
//        (reader ? reader.abort : read)(abort, cb)
        }
      }
      else if(!reader)
        (reader = create(cb))(read)
      else {//there will only be one value, so assume this is the end
        console.log('END NOW')
        cb(true)
      }
    }
  }
}





