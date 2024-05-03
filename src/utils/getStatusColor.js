
export default function getStatusColor(status) {
  switch (status?.toUpperCase()) {
    case "APPROVED":
    case "PAID":
    case "ACTIVE":
    case "ACCEPTED":
    case "DEPOSITED":
    case "COMPLETED":
    case "COMPLETE":
    case "SUCCESS":
    case "SUBMITTED":
    case "DELIVERED":
      return {color: "white", bgColor: 'text.islamicGreen', icon:'tabler:square-check'};
    case "REJECTED":
    case "SUSPENDED":
    case "EXPIRED":
    case "DELETED":
    case "LOCKED":
    case "CANCELLED":
      return {color: "white", bgColor: 'text.rustyRed', icon:'tabler:ban'};
    default:
      return {color: "white", bgColor: 'text.orange', icon:'tabler:loader'};
  }
}
