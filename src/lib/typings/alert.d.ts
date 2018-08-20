import { PluginObject } from 'vue'

export interface YPPAlertConfig extends Object {
  [namespace: string]: any
}

export interface YPPAlert extends PluginObject<YPPAlertConfig> {}