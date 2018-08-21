import { PluginObject } from 'vue'

export interface YPPCaptchaConfig extends Object {
  
}

export interface YPPCaptchaComponentStauts extends YPPCaptchaConfig {
  disable: boolean
}


export interface YPPAlert extends PluginObject<YPPCaptchaConfig> {}