import axios from "axios"
import { Fragment, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const EmailVerify = () => {
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:5001/api/users/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                toast.success('Your email has been verified! Now log in to your account')
            } catch (error) {
                console.log(error);
                toast.error('Invalid url! Try again')
            } finally {
                navigate('/login')
            }
        }
        verifyEmailUrl();
    }, [navigate]);

    return (
        <Fragment>
            <div className="splash-container">
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuenow={75}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: '75%' }} // Corrected style value
                    ></div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmailVerify