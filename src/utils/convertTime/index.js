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
