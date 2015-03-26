'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('skillCircles'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));
});
