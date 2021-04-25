const glob = require('glob')
const path = require('path')



const pages = function(){
  let jsPath = path.resolve(__dirname,'src/pages')
  let jsFiles = glob.sync(jsPath+'/**/index.js')
  let map = {}
  jsFiles.forEach(file=>{
    let fileDirName = file.match(/\/([^/]+)\/index.js/i)[1]
    console.log(fileDirName)
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
console.log(pages())


module.exports = {
  outputDir:__dirname+'/dist',
  configureWebpack:{
    output:{
      filename:'[name]/[name].js',
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
            test: function(module,chunk){
              return module.resouce && module.resouce.includes('/common/')
            },
            priority: 10,
            minChunks:1,
            minSize:0,
            chunks: 'all'
          }
        }
      }
    }
  },
  pages:pages()
}