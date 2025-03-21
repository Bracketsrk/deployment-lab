import { Navigate } from "react-router";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    authToken: string;
    children: ReactNode;
}

export function ProtectedRoute({authToken, children}: ProtectedRouteProps): ReactNode {
    if (!authToken) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
}