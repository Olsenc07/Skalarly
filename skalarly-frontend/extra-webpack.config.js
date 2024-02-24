module.exports = {
    // Other configurations...
    output: {
      // Other output configurations...
      module: true, // Enable ESM output
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
  };
  