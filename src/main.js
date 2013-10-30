require(['require', 'config/require.js'], function (require) {

  window.amd = function amd(deps) {
    var arb = deps.filter(function (d, i) {
      return /^arb\./.test(d);
    })
    arb.forEach(function (part, i, theArray) {
      if (/^arb\./.test(part)) {
        theArray[i] = theArray[i].replace('arb.', '').replace('.', '/');
      }
    });
    console.log(arb)

    var teste = require(arb, function () { return deps; });
    return teste;
  };

	// Require base files
	require(['jquery', 'angular', 'app']);
});
