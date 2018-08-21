import { PluginObject } from 'vue'

export interface YPPConfirmConfig extends Object{
  isShow: boolean

  title: string

  icon: string

  text: object

  explain: object

  btn: string

  btnCancel: string

  hasClose: boolean
}

export interface YPPConfirm extends PluginObject<YPPConfirmConfig> {}