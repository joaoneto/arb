define('ngRequirePackage', ['angular'], function () {
  function ngRequirePackage(options) {
    if (!options.name) throw new Error('No package name');
    if (!options.type) throw new Error('No package type');
    if (!options.object) throw new Error('No package object');

    this.name = options.name;
    this.type = options.type;
    this.dependencies = options.dependencies || [];
    this.object = options.object;
  }

  ngRequirePackage.load = function load(modules) {
    var deps = [], i = 0, len = modules.length, module;

    for (; i < len; i++) {
      module = modules[i];
      if (module instanceof ngRequirePackage) {
        angular
          .module(module.name, module.dependencies || [])
          [module.type](module.name.split('.').pop(), module.object)
        deps.push(module.name);
      }
    }

    return deps;
  }

  return ngRequirePackage;
});
