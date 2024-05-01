import { Suspense, lazy, ElementType } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// guards
import useAuth from "../hooks/useAuth";
// layouts
import MainLayout from "../layouts/main";
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
// import GuestGuard from '../guards/GuestGuard';
// import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
// import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from "../components/LoadingScreen";
import CodeVerification from "pages/CodeVerification";
// import SuccessPage from "pages/SuccessPage";
import Search from "pages/Search";

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes("/dashboard") && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // {
    //   path: 'auth',
    //   children: [
    //     {
    //       path: 'login',
    //       element: (
    //         <GuestGuard>
    //           <Login />
    //         </GuestGuard>
    //       ),
    //     },
    //     {
    //       path: 'register',
    //       element: (
    //         <GuestGuard>
    //           <Register />
    //         </GuestGuard>
    //       ),
    //     },
    //     { path: 'reset-password', element: <ResetPassword /> },
    //     { path: 'verify', element: <VerifyCode /> },
    //   ],
    // },

    // Main Routes
    // {
    //   path: '*',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: 'coming-soon', element: <ComingSoon /> },
    //     { path: 'maintenance', element: <Maintenance /> },
    //     { path: 'pricing', element: <Pricing /> },
    //     { path: 'payment', element: <Payment /> },
    //     { path: '500', element: <Page500 /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" replace /> },
    //   ],
    // },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: "/trending", element: <TrendingPage /> },
        { path: "/book/:id", element: <BookPage /> },
        { path: "/pay/:id", element: <PayPage /> },
        { path: "/book-time/:id", element: <BookTimePage /> },
        { path: "/fan-profile", element: <FanProfilePage /> },
        { path: "/fan-settings", element: <FanSettingsPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/forgot-password", element: <ForgotPasswordPage /> },
        { path: "/code-verification", element: <CodeVerification />},        
        { path: "/success", element: <Success /> },
        { path: "/successful", element: <SuccessPage /> },
        { path: "/create-password", element: <CreatePasswordPage /> },
        { path: "/search", element: <Search /> },

      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
// const Login = Loadable(lazy(() => import('../pages/auth/Login')));
// const Register = Loadable(lazy(() => import('../pages/auth/Register')));

// Main
const HomePage = Loadable(lazy(() => import("../pages/Home")));
const TrendingPage = Loadable(lazy(() => import("../pages/Trending")));
const SearchPage = Loadable(lazy(() => import("../pages/Search")));
const BookPage = Loadable(lazy(() => import("../pages/Book")));
const PayPage = Loadable(lazy(() => import("../pages/Pay")));
const BookTimePage = Loadable(lazy(() => import("../pages/BookTime")));
const FanProfilePage = Loadable(lazy(() => import("../pages/FanProfile")));
const FanSettingsPage = Loadable(lazy(() => import("../pages/FanSettings")));
const LoginPage = Loadable(lazy(() => import("../pages/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/Register")));
const ForgotPasswordPage = Loadable(lazy(() => import("../pages/ForgotPassword")));
const CreatePasswordPage = Loadable(lazy(() => import("../pages/CreatePassword")));
const SuccessPage = Loadable(lazy(() => import("../pages/SuccessPage")));
const Success = Loadable(lazy(() => import("../pages/Success")));
