const glob = require('glob')
const path = require('path')



// const pages = function(){
//   let jsPath = path.resolve(__dirname,'src/pages')
//   let jsFiles = glob.sync(jsPath+'/**/index.js')
//   let map = {}
//   jsFiles.forEach(file=>{
//     let fileDirName = file.match(/\/([^/]+)\/index.js/i)[1]
//     // console.log(fileDirName)
//     map[fileDirName] = {
//       entry:`src/pages/${fileDirName}`,
//       template:'public/index.html',
//       title:`${fileDirName}`,
//       filename:`${fileDirName}/${fileDirName}.html`,
//       chunks:['vendors','common',`${fileDirName}`]
//     }
//   })
//   return map
// }
// console.log(pages())

const outputMap = {
  index:'index',
  'sub-form':'subscribe/sub-form',
  'sub-list':'subscribe/sub-list'
}

module.exports = {
  outputDir:__dirname+'/dist',
  configureWebpack:{
    output:{
      filename(module){
       return `${outputMap[module.chunk.name]}.js`
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
      filename: 'index.html',
      chunks: [ 'vendors', 'index' ]
    },
    'sub-form': {
      entry: 'src/pages/subscribe/sub-form',
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