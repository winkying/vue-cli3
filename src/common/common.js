// h5和cms_h5使用的公用js
// link

import Vue from 'vue'
// import VueResource from 'vue-resource'

import allUrl from './allUrl'
import auth from './auth'
// import apiRequest from './apiRequest'
import appApi from './appApi'
import apiGetWay from './apiGetWay'

import browser from './browser'

import './raw.js'

window.Vue = Vue
// 初始化js
allUrl(Vue)
auth(Vue)
browser(Vue)
// apiRequest(Vue, VueResource)
appApi(Vue)
apiGetWay(Vue)
