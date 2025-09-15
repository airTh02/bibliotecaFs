import { useAuth } from "@/context/authContext";

export const Header = () => {
    const { user, logout } = useAuth()

    return (
        <div>
            <span>{user?.name}</span>
            <button onClick={logout}>Logout</button>
        </div>

    );
};
