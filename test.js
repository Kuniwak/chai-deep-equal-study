const chai = require('chai');
const overridableDeepEqual = require('./index');
const assert = chai.assert;


chai.use(overridableDeepEqual);


class ExampleEquatable {
  constructor(id) {
    Object.defineProperty(this, 'id', {
      enumerable: false,
      value: id,
    });
  }

  isEqual(another) {
    return this.id === another.id;
  }
}



describe('Chai deepEqual customization', () => {
  const a = {
    foo: 0,
    bar: new ExampleEquatable(0),
  };

  const b = {
    foo: 0,
    bar: new ExampleEquatable(123)
  };

  const c = {
    foo: 123,
    bar: new ExampleEquatable(0)
  };

  const d = {
    foo: 123,
    bar: new ExampleEquatable(123)
  };

  context('when a === b', () => {
    it('should pass', () => {
      assert.deepEqual(a, a);
    });
  });

  context('when a.foo === b.foo && a.bar equals b.bar', () => {
    it('should pass', () => {
      assert.deepEqual(a, Object.assign({}, a));
    });
  });

  context('when a.foo === b.foo && a.bar not equals b.bar', () => {
    it('should fail', () => {
      assert.throws(() => {
        assert.deepEqual(a, b);
      });
    });
  });

  context('when a.foo !== b.foo && a.bar equals b.bar', () => {
    it('should fail', () => {
      assert.throws(() => {
        assert.deepEqual(a, c);
      });
    });
  });

  context('when a.foo !== b.foo && a.bar not equals b.bar', () => {
    it('should fail', () => {
      assert.throws(() => {
        assert.deepEqual(a, d);
      });
    });
  });
});
