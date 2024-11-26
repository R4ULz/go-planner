import { useRequireAdmin } from "../hooks/useRequireAdmin"

export default function Dashboard(){
  useRequireAdmin();
  return(
    <div>
      Dashboard
    </div>
  )
}