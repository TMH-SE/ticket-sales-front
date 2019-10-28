export const minutesToHours = n => {
  let minute = n % 60
  let hour = Math.floor(n / 60)
  let time = {
    minute: minute,
    hour: hour
  }
  return time
}

export const hourToMinute = (h, m) => {
  let minutes = h * 60 + m
  return minutes
}

export const convertTimeStamp = timestamp => {
  const date = new Date(timestamp).getDate()
  const month = new Date(timestamp).getMonth() + 1
  const year = new Date(timestamp).getFullYear()
  const time = new Date(timestamp).toTimeString().split(' ')[0]
  return `${year}-${month}-${date} ${time}`
}
