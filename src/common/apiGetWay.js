/* eslint-disable */
/**
 * @description 常用接口的调用
 * @exports apiGetWay
 */
export default function apiGetWay(Vue) {
  /**
     * @description 获取实时价格库存
     * @param {Array} itemIds 商品ids
     * @param {Array} obj 商品数据
     * @param {Number} promotionId -
     * @param {Function} callback 回调函数
     * @param {Boolean} hideLoading 是否隐藏Loading
     * @global
     * @example
     * Vue.getPriceAndStock(itemIds, res.data.dataList, null, () => {});
     */
  Vue.getPriceAndStock = function(mpIds, obj, promotionId, callback, hideLoading) {
    if ((mpIds || '').length == 0) return
    var url = '' + Vue.allUrl.getPriceStockList
    var param = {
      mpIds: mpIds, // 商品ids
      promotionId: promotionId || '',
      areaCode: null
    }
    Vue.api.get(url, param, (res) => {
      var plistMap = {}
      for (const pl of res.data.plist || []) {
        plistMap[pl.mpId] = pl
      }
      for (const pl of obj || []) {
        if (plistMap[pl.mpId]) {
          Vue.set(pl, 'memberPrice', plistMap[pl.mpId].memberPrice)
          Vue.set(pl, 'availablePrice', plistMap[pl.mpId].availablePrice)
          Vue.set(pl, 'originalPrice', plistMap[pl.mpId].originalPrice)
          Vue.set(pl, 'availablePriceText', plistMap[pl.mpId].availablePriceText)
          Vue.set(pl, 'promotionIcon', plistMap[pl.mpId].promotionIcon)
          Vue.set(pl, 'titleIconTexts', plistMap[pl.mpId].promotionIconTexts)
          Vue.set(pl, 'promotionPrice', plistMap[pl.mpId].promotionPrice)
          Vue.set(pl, 'stockNum', plistMap[pl.mpId].stockNum)
          Vue.set(pl, 'volume4sale', plistMap[pl.mpId].volume4sale)// 商品销量
          Vue.set(pl, 'isPresell', plistMap[pl.mpId].isPresell)
          Vue.set(pl, 'isSeckill', plistMap[pl.mpId].isSeckill)
          Vue.set(pl, 'balancePayment', plistMap[pl.mpId].balancePayment)
          Vue.set(pl, 'presellBookedNum', plistMap[pl.mpId].presellBookedNum)
          Vue.set(pl, 'presellDownPrice', plistMap[pl.mpId].presellDownPrice)
          Vue.set(pl, 'presellOffsetPrice', plistMap[pl.mpId].presellOffsetPrice)
          Vue.set(pl, 'presellTotalPrice', plistMap[pl.mpId].presellTotalPrice)
          Vue.set(pl, 'membershipPrice', plistMap[pl.mpId].membershipPrice)
          Vue.set(pl, 'promotionId', plistMap[pl.mpId].promotionId)
          if (pl.isPresell) {
            pl.availablePrice = pl.presellTotalPrice
          }
        }
      }
      if (callback) {
        callback(obj)
      }
    }, (res) => {
      Vue.api._showError(res.message)
    }, hideLoading)
  }

  /**
     * @description 获取所有渠道信息
     * @param {Function} callback 回调函数
     * @global
     * @example
     * Vue.getAllChannel(() => {});
     */
  Vue.getAllChannel = function(callback) {
    var url = Vue.allUrl.getAllChannel
    Vue.api.get(url, null, (res) => {
      if (res && res.data) {
        if (callback) {
          callback(res.data)
        }
      }
    }, (res) => {
      Vue.api._showError(res.message)
    })
  }

  /**
     * @description 获取系列品接口 包装数据
     * @param {String} itemId id
     * @param {Function} callback 回调函数
     * @global
     * @example
     * Vue.getItemSerialAttrList(code, () => {});
     */
  Vue.getItemSerialAttrList = function(itemId, callback) {
    Vue.api.post(Vue.allUrl.serialProducts, { mpId:itemId,canSale: 1 }, (result) => {
      // 积分商品的详情页，要屏蔽促销
      // 声明一个对象，准备往里边放系列品数据
      const serialProductData = {
        attributes: [],
        serialProducts: []
      }
      // 判断接口中是否返回数据
      if (result.data && result.data.length > 0) {
        // 声明一个空数组，用来存放系列品id
        const serialProductsId = []
        // 申明一个空数组 用来存放系列属性标题  例如系列品的 颜色、款式
        const attrNameArr = []
        // 判断数据中是否返回系列属性
        if (result.data[0].serialAttrList && result.data[0].serialAttrList.length > 0) {
          // 因为系列品标题都是一样的，所以取第一个系列品属性标题即可
          for (let w = 0; w < result.data[0].serialAttrList.length; w++) {
            // 将系列品属性标题放入 attrNameArr中  例如系列品的 颜色、款式
            attrNameArr.push(result.data[0].serialAttrList[w].attrName)
          }
          //  判断 attrNameArr中是否有值
          if (attrNameArr.length > 0) {
            for (let o = 0; o < attrNameArr.length > 0; o++) {
              // 循环 attrName把里面的系列品属性标题存放在 事先定义好的数组中
              serialProductData.attributes.push({ 'name': attrNameArr[o] })
            }
            //  判断 serialProductData.attributes中是否有值
            if (serialProductData.attributes && serialProductData.attributes.length > 0) {
              for (let k = 0; k < serialProductData.attributes.length > 0; k++) {
                // 循环serialProductData.attributes给每个serialProductData.attributes里面添加一个values数组属性
                serialProductData.attributes[k].values = []
              }
            }
          }
        }
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].serialAttrList && result.data[i].serialAttrList.length > 0) {
            // 事先声明一个空数组 用来装系列品组合出来所对应的id
            const keyArr = []
            for (let j = 0; j < result.data[i].serialAttrList.length; j++) {
              // 存放在 serialProductData.serialProducts[x]中字段key属性里
              keyArr.push(result.data[i].serialAttrList[j].valueId)

              // 判断 serialProductData.attributes中是否有值
              if (serialProductData.attributes && serialProductData.attributes.length > 0) {
                for (let k = 0; k < serialProductData.attributes.length > 0; k++) {
                  // 将每一个系列品属性存放在 与系列品属性标题同级的字段values中
                  if (serialProductData.attributes && serialProductData.attributes.length > 0) {
                    if (serialProductData.attributes[k].name == result.data[i].serialAttrList[j].attrName) {
                      if (serialProductData.attributes[k].values.filter(item => item.id == result.data[i].serialAttrList[j].valueId).length > 0) {
                        continue
                      } else {
                        // 放入系列品的属性 例如 红色、长款
                        serialProductData.attributes[k].values.push({ 'value': result.data[i].serialAttrList[j].valueName, 'id': result.data[i].serialAttrList[j].valueId, 'checked': false })
                      }
                    }
                  }
                }
              }
            }
            // 将子品的mpId存放在数组中
            serialProductsId.push(result.data[i].mpid)
            //  将子品的属性存放在数组中
            serialProductData.serialProducts.push({ 'key': '_' + keyArr.join(',').replace(/\,/g, '_') + '_', 'product': { 'mpId': result.data[i].mpid, 'chineseName': result.data[i].chineseName, 'typeOfProduct': 0, 'securityVOList': [], 'pictureUrl': true }})
          }
        }
        if (serialProductData.serialProducts && serialProductData.serialProducts.length > 0) {
          for (let i = 0; i < serialProductData.serialProducts.length; i++) {
            serialProductData.serialProducts[i].product.securityVOList = []
          }
        }
        // 检查所有系列品在一定区域是否可售
        function checkSerialProducts() {
          return new Promise((resolve, reject) => {
            Vue.api.get(Vue.allUrl.getItemCanSaleArea, { mpIds: serialProductsId.join(','), areaCode: null }, (res) => {
              if (res.code == 0 && res.data) {
                if (serialProductData.serialProducts && serialProductData.serialProducts.length > 0) {
                  for (let o = 0; o < serialProductData.serialProducts.length; o++) {
                    for (const k in res.data) {
                      if (serialProductData.serialProducts[o].product.mpId == k) {
                        serialProductData.serialProducts[o].product.isAreaSale = res.data[k]
                      }
                    }
                  }
                  resolve()
                }
              } else {
                resolve()
              }
            }, (res) => {
              resolve()
            })
          })
        }
        // 获取商品保障方式接口
        function getSecurities() {
          return new Promise((resolve, reject) => {
            Vue.api.post(Vue.allUrl.getItemSecurities, { mpIds: serialProductsId }, (res) => {
              if (res.code == 0 && res.data && res.data.length > 0) {
                if (serialProductData && serialProductData.serialProducts && serialProductData.serialProducts.length > 0) {
                  for (let i = 0; i < serialProductData.serialProducts.length; i++) {
                    for (let j = 0; j < res.data.length; j++) {
                      if (serialProductData.serialProducts[i] && serialProductData.serialProducts[i].product) {
                        if (serialProductData.serialProducts[i].product.mpId == res.data[j].merchantProductId) {
                          serialProductData.serialProducts[i].product.securityVOList.push(res.data[j])
                        }
                      }
                    }
                  }
                }
                resolve()
              } else {
                resolve()
              }
            }, (res) => {
              resolve()
            })
          })
        }
        // 获取商品图片接口
        function getItemPics() {
          return new Promise((resolve, reject) => {
            Vue.api.post(Vue.allUrl.getItemImageData, { mpIds: serialProductsId }, (res) => {
              if (res.code == 0 && res.data && res.data.length > 0) {
                if (serialProductData && serialProductData.serialProducts && serialProductData.serialProducts.length > 0) {
                  for (let i = 0; i < serialProductData.serialProducts.length; i++) {
                    for (let k = 0; k < res.data.length; k++) {
                      if (serialProductData.serialProducts[i] && serialProductData.serialProducts[i].product) {
                        if (serialProductData.serialProducts[i].product.mpId == res.data[k].merchantProductId && res.data[k].isMainPicture == 1) {
                          serialProductData.serialProducts[i].product.pictureUrl = res.data[k].pictureUrl
                        }
                      }
                    }
                  }
                }
                resolve()
              }
              resolve()
            }, (res) => {
              resolve()
            })
          })
        }
        // 获取商品是否上下架接口
        function getItemCansaleType() {
          return new Promise((resolve, reject) => {
            Vue.api.postForm(Vue.allUrl.getItemCansale, { mpIds: serialProductsId.join(',') }, (res) => {
              if (res.code == 0 && res.data && res.data.dataList && res.data.dataList.length > 0) {
                if (serialProductData && serialProductData.serialProducts && serialProductData.serialProducts.length > 0) {
                  for (let i = 0; i < serialProductData.serialProducts.length; i++) {
                    for (let k = 0; k < res.data.dataList.length; k++) {
                      if (serialProductData.serialProducts[i] && serialProductData.serialProducts[i].product) {
                        if (serialProductData.serialProducts[i].product.mpId == res.data.dataList[k].mpId) {
                          serialProductData.serialProducts[i].product.managementState = res.data.dataList[k].canSale
                        }
                      }
                    }
                  }
                }
                resolve()
              } else {
                resolve()
              }
            }, (res) => {
              resolve()
            })
          })
        }
        Promise.all([checkSerialProducts(), getSecurities(), getItemPics(), getItemCansaleType()]).then(() => {
          if (callback) {
            callback(serialProductData)
          }
        })
      }
    },(error) =>{
        if(Number(error.code) != 500){
            $.tips({
                content: error.msg,
                stayTime: 2000,
                type: 'warn'
            })
        }
    })
  }
  Vue.hdbAutoLogin = function(prodId,cb,err){
    if (!prodId) {
      Vue.prototype.$toast('缺少楼盘信息')
      return
    }
    let url = Vue.browser.BChostMapping() + Vue.allUrl.getBuildingOpenInfo
    // url = 'https://www.fastmock.site/mock/e94c4c5e14a6b2951eae1c0bd72eb317/h5/onlineOpening/getBuildingOpenInfo'
    Vue.api.get(url,{prodId},res=>{
      if(res.data){        
        if(res.data.orgCode){
          //有接口从cookie中读取merchant_id，storeId，shopId等字段，所系需要cookie中保留
          Vue.cookie.setCookie('shopId', res.data.orgCode||'');
          Vue.cookie.setCookie('storeId',res.data.orgCode||'');
          Vue.cookie.setCookie('merchant_id',res.data.orgCode||'');
          Vue.cookie.setCookie('sessId',res.data.sessId||'');
          Vue.cookie.setCookie('sessionName',encodeURIComponent(res.data.sessionName||''));
          Vue.cookie.setCookie('storeName',encodeURIComponent(res.data.orgName||''));
          Vue.cookie.setCookie('hdb-projectGuid',encodeURIComponent(res.data.projectGuid||''));
        }
        //TODO:模拟选房调试
        // res.data.simulation = 1
        Vue.cookie.setCookie('simulation',res.data.simulation||0)
        if(typeof cb == 'function'){
          cb(res.data);
        }
      }else if(typeof err == 'function'){
        err(res)
      }else{
        Vue.api._showError(res.message)
      }
    })
  }
}
