const withAntdLess = require('next-plugin-antd-less')

module.exports = withAntdLess({
  modifyVars: { '@primary-color': '#04f' },
  lessVarsFilePath: './src/styles/variables.less',
  webpack (config) {
    return config
  }
})
