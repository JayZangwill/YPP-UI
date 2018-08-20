import Vue from 'vue'

declare function install(vue: typeof Vue, options?: object): void

declare class YPPUI extends Vue {}

declare const YPPInstall: {
install: typeof install
}

export { YPPUI }

export default YPPInstall
