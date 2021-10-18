import parse from 'parse/weapp'
import config from '@/static/config/index.js'
// 注册parse-server服务
parse.serverURL =config.parseServerBaseUrl
parse.initialize(config.ParseAppId, config.parseServerJsKey)
parse.masterKey = config.Master_Key

export default parse;