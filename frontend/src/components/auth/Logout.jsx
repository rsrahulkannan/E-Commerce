import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('jwt-auth-token')

        const timeout = setTimeout(() => {
            navigate('/login');
        }, 1000); // Delay the navigation by 1 second

        return () => {
            clearTimeout(timeout); // Clear the timeout on unmount
        };
    }, [navigate])
    

  return (
    <div>Logout</div>
  )
}

export default Logout