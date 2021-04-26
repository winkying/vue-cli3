const glob = require('glob')
const path = require('path')



const pages = function(){
  let jsPath = path.resolve(__dirname,'src/pages')
  let jsFiles = glob.sync(jsPath+'/**/index.js')
  let map = {}
  jsFiles.forEach(file=>{
    let fileDirName = file.match(/\/([^/]+)\/index.js/i)[1]
    // console.log(fileDirName)
    map[fileDirName] = {
      entry:`src/pages/${fileDirName}`,
      template:'public/index.html',
      title:`${fileDirName}`,
      filename:`${fileDirName}/${fileDirName}.html`,
      chunks:['vendors','common',`${fileDirName}`]
    }
  })
  return map
}
// console.log(pages())


module.exports = {
  outputDir:__dirname+'/dist',
  configureWebpack:{
    output:{
      filename:function(module,chunk){
        // if(module.chunk.name=='sub-form'){
          // for (var i in module.chunk.entryModule){
            //获取当前打包文件的路径
            // console.log(i)
            // console.log('=============')
            // console.log(module.chunk.entryModule[i])
          // }
          // console.log(typeof module.chunk.entryModule && module.chunk.entryModule.length)
          console.log(module.chunk.entryModule.dependencies[2].module.context)
          // console.log(module.chunk.entryModule[2].context)
          //截取最后一位dependency
        let fileDependecy = Array.prototype.splice.call(module.chunk.entryModule.dependencies,-1)
        ///Users/lseven/workspace/ody/git-web/erkai/hengda/hello-world/src/pages/subscribe/sub-form
        let fileContext = fileDependecy[0].module.context
        //以pages/做区分去除层级目录
        let fileFullDir = fileContext.split('pages/')[1]
        // subscribe/sub-form
        //取最后一项   最多支持两级目录，父子目录
        // let fileDir = Array.prototype.splice.call(fileFullDir.split('/'),-1)
        // let fileParentDir = Array.prototype.splice.call(fileFullDir.split('/'),0,1)
        // }
        // return `${fileFullDir}.js`
        return 'js/[name].js'
      },
      chunkFilename:'[name].js'
    },
    optimization:{
      splitChunks:{
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial'
          },
          common: {
            name: 'common',
            // test: function(module,chunk){
            //   return module.resource && module.resource.includes('/common/')
            // },
            test:/common/,
            priority: 10,
            minChunks:1,
            minSize:0,
            chunks: 'all'
          }
        }
      }
    }
  },
  pages:{
    index: {
      entry: 'src/pages/index',
      template: 'public/index.html',
      title: 'index',
      filename: 'index/index.html',
      chunks: [ 'vendors', 'common', 'index' ]
    },
    'sub-form': {
      entry: 'src/pages/subscribe//sub-form',
      template: 'public/index.html',
      title: 'sub-form',
      filename: 'subscribe/sub-form.html',
      chunks: [ 'vendors', 'common', 'sub-form' ]
    },
    'sub-list': {
      entry: 'src/pages/subscribe/sub-list',
      template: 'public/index.html',
      title: 'sub-list',
      filename: 'subscribe/sub-list.html',
      chunks: [ 'vendors', 'common', 'sub-list' ]
    }
  }
}