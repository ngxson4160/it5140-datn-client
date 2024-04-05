interface INotification {
  title?: string
  message?: string | VNode
}

export const useNotificationSuccess = (params?: INotification) => {
  ElNotification({
    ...(params && params.title && { title: params.title }),
    ...(params && params.message && { message: params.message }),
    ...(!params && { title: '成功' }),
    type: 'success',
  })
}

export const useNotificationError = (params?: INotification) => {
  ElNotification({
    ...(params && params.title && { title: params.title }),
    ...(params && params.message && { message: params.message }),
    ...(!params && { title: '失敗しました' }),
    type: 'error',
  })
}
