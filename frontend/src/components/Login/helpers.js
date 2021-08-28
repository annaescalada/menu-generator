import authService from "../../services/auth";
import { authorize } from "../../services/api";

export const handleLogin = async (email, password, me, setMessage) => {
    try {
        const { data: { token } } = await authService.login({ email, password })
        authorize(token)
        me()
    } catch(e) {
        setMessage(e?.response?.data?.message)
    }
}
