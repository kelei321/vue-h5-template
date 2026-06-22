import dayjs from 'dayjs'

export function formatDateTime(value?: string | number | Date, template = 'YYYY-MM-DD HH:mm') {
  if (!value) {
    return '-'
  }
  return dayjs(value).format(template)
}

export function formatDate(value?: string | number | Date, template = 'YYYY-MM-DD') {
  if (!value) {
    return '-'
  }
  return dayjs(value).format(template)
}
