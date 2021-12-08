module.exports = {
  apps : [{
    name: 'todo-demo-api',
    script: 'server.js',
    watch: '.',
    env: {
      'NODE_ENV': 'uat',
    },
  }]
};
