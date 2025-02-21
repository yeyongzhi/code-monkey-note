import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal']
  )

export default message