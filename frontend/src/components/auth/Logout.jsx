import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('jwt-auth-token')
        toast.warning('You have been logged out from the system')
        navigate('/login');
    }, [navigate])
    

  return (
    <></>
  )
}

export default Logout