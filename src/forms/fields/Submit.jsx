export function Submit({ label, action = () => {} }) {
  return <button onClick={action}>{label}</button>
}
