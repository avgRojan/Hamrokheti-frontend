
export default function formatMoney(number) {
  if(number === undefined || number === null || number === ''){
    return null
  }

  return Number(number).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
