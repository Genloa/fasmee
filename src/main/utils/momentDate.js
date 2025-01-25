import moment from 'moment-timezone'

export default function momentDate(date, format = null) {
  return moment(date).tz('America/Caracas').utc().format(format)
}

export function formatDateWithMoment(date) {
  return moment(date).format('YYYY-MM-DD')
}
