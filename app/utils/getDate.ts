export const getDate = () => {
  var date = new Date()
  var year = date.getFullYear()
  var month = ('0' + (date.getMonth() + 1)).slice(-2)
  var day = ('0' + date.getDate()).slice(-2)
  var lte_month = ('0' + (date.getMonth() + 2)).slice(-2)
  var lte_year = year
  if (date.getMonth() + 1 === 12) {
    lte_month = '01'
    lte_year = year + 1
  }
  var date_gte = year + '-' + month + '-' + day
  var date_lte = lte_year + '-' + lte_month + '-' + day
  return { date_gte, date_lte }
}
