import uniqueId from '@form-create/utils/lib/unique'
import { getInjectArg, localeOptions, localeProps } from '../../utils'

const label = '上传'
const name = 'upload'

export default {
  menu: 'main',
  icon: 'icon-upload',
  label,
  name,
  input: true,
  event: ['change', 'remove', 'preview', 'error', 'progress', 'exceed'],
  languageKey: ['clickToUpload'],
  validate: ['array'],
  rule({ t }) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.upload.name'),
      info: '',
      $required: false,
      props: {
        action: '/api/FileStorage/Upload', // 上传地址
        data: {
          FileTree: 'FormDesign/File'
        },
        // beforeUpload:
        //   "$FNX://这里要进行设置headers.authorization\nconst userInfo = JSON.parse(window.localStorage.getItem('user') || '{}')\nif(!$inject.self.props.headers){\n\t$inject.self.props.headers = {}\n}\nif(userInfo.token){\n\t$inject.self.props.headers[userInfo.tokenKey] = userInfo.token\n}\n//设置请求参数\nif($inject.args){\n  $inject.self.props.data.FileName = $inject.args[0].name\n}",
        // onSuccess:
        //   '$FNX:const res = $inject.args[0];\nconst file = $inject.args[1];\n\nfile.value = res.Item;',
        onSuccess:
          "$FNX:const res = $inject.args[0];\nconst file = $inject.args[1];\nconst fileList = $inject.args[2];\nif (res.Status === 1) {\n  const fileName = res.Item.filename + res.Item.fileextension;\n  // 设置文件的值和URL\n  file.uid = res.Item.id;\n  file.url = '/api/FileStorage/download/raw/' + res.Item.id + '?' + fileName;\n  file.name = fileName;\n  // 触发值更新\n  console.log(\"上传成功\",file,$inject.args);\n}\nreturn file",
        listType: 'text'
      }
    }
  },
  props(_, { t }) {
    return localeProps(t, name + '.props', [
      {
        type: 'switch',
        field: 'disabled'
      },
      {
        type: 'select',
        field: 'listType',
        options: localeOptions(t, [
          { label: 'text', value: 'text' },
          {
            label: 'picture',
            value: 'picture'
          },
          {
            label: 'picture-card',
            value: 'picture-card'
          }
        ])
      },
      { type: 'switch', field: 'multiple' },
      {
        type: 'input',
        field: 'action'
      },
      {
        type: 'input',
        field: 'accept'
      },
      {
        type: 'FnInput',
        field: 'beforeUpload',
        props: {
          body: true,
          button: true,
          fnx: true,
          args: [getInjectArg(t)],
          name: 'beforeUpload'
        }
      },
      {
        type: 'FnInput',
        field: 'beforeRemove',
        props: {
          body: true,
          button: true,
          fnx: true,
          args: [getInjectArg(t)],
          name: 'beforeRemove'
        }
      },
      {
        type: 'FnInput',
        field: 'onSuccess',
        warning: t('com.upload.info'),
        props: {
          body: true,
          button: true,
          fnx: true,
          args: [getInjectArg(t)],
          name: 'onSuccess'
        }
      },
      {
        type: 'FnInput',
        field: 'onPreview',
        props: {
          body: true,
          button: true,
          fnx: true,
          args: [getInjectArg(t)],
          name: 'onPreview'
        }
      },
      {
        type: 'TableOptions',
        field: 'headers',
        props: {
          column: [
            { label: t('props.key'), key: 'label' },
            { label: t('props.value'), key: 'value' }
          ],
          valueType: 'object'
        }
      },
      {
        type: 'TableOptions',
        field: 'data',
        props: {
          column: [
            { label: t('props.key'), key: 'label' },
            { label: t('props.value'), key: 'value' }
          ],
          valueType: 'object'
        }
      },
      {
        type: 'switch',
        field: 'withCredentials'
      },
      {
        type: 'switch',
        field: 'autoUpload',
        value: true
      },
      {
        type: 'inputNumber',
        field: 'limit',
        props: { min: 0 }
      }
    ])
  }
}
