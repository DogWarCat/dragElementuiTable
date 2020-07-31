module.exports = {
  // vant官网定制主题中有相关的webpack配置，但是这里需要的是vuex的配置，所以可以去
  // vue官网生态系统->vue-cli->配置参考->css.loaderOptions找相关配置
  publicPath:'./',
  css: {
    loaderOptions: {
      scss: {
        // 这里的选项会传递给 less-loader
        modifyVars: {
          // 直接覆盖变量
          blue: '#409eff'

        }
      }
    }
  },
  devServer: {
    overlay: {
        warnings: false,
        errors: false
    }
},
lintOnSave: false
}
