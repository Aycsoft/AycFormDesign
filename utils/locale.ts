import { useI18n } from '@/hooks/web/useI18n'

// 使用全局的 i18n
const { t, localeLang } = useI18n()

// 导出给其他文件使用
export { t }
export default function useLocale() {
  return {
    t,
    locale: localeLang,
    localeLang: localeLang
  }
}

// 兼容原有的 globalT 导出
export const globalT = t
// import {useLocale} from './index';
// import {ref} from 'vue';
// import ZhCn from '../locale/zh-cn';

// let _t = null;
// let locale = ref(null);

// function t(...args) {
//     return _t(...args);
// }

// const globalUseLocale = (_locale) => {
//     locale.value = _locale || ZhCn;
//     const data = useLocale(locale);
//     _t = data.t;
//     return data;
// };

// globalUseLocale();

// export default globalUseLocale;

// export {t, locale};
