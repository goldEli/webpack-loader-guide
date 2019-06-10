module.exports = function(source, map) {
  this.callback(
      null,
      source.replace(/debugger/g, ''),
      map
  );
};