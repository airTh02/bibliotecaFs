import { ModeToggle } from "@/components/dark-light"
import { LoginForm } from "@/components/forms/loginForm"

export const Login = () => {
    return (
        <div className="">
            <ModeToggle />
            <LoginForm/>
        </div>
    )
}