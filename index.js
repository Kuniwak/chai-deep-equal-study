module.exports = function overridableDeepEqual(_, util) {
  const originalEql = util.eql;
  util.eql = (l, r) => {
    return originalEql(l, r, {
      comparator: (l, r) => {
        if (!(l && typeof l.isEqual === 'function')) {
          return undefined;
        }
        return l.isEqual(r);
      },
    });
  };
};
