import React, { use } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import NotificationsPage from "./pages/NotificationsPage"
import CallPage from "./pages/CallPage"
import ChatPage from "./pages/ChatPage"
import OnboardingPage from "./pages/OnboardingPage"

import { Toaster, toast } from 'react-hot-toast';
import { Navigate } from 'react-router';
import PageLoader from './components/PageLoader'
import useAuthUser from './hooks/useAuthUser'
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeSelector.js'

const App = () => {

  const { theme } = useThemeStore();
  const { isLoading, authUser } = useAuthUser();
  if (isLoading) return <PageLoader />;


  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  return (
    <div className='h-screen p-2' data-theme={theme}>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true}>
          <HomePage />
        </Layout>) : (
          <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
        )} />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationsPage />
          </Layout>
        ) : (<Navigate to={!isAuthenticated ? ('/login') : ('/onbording')} />)} />
        <Route path='/call/:id' element={isAuthenticated && isOnboarded ? (
          <CallPage />
        ) : (<Navigate to={!isAuthenticated ? ('/login') : ('/onbording')} />)} />
        <Route path='/chat/:id' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
            <ChatPage />
          </Layout>
        ) : (<Navigate to={!isAuthenticated ? ('/login') : ('/onbording')} />)} />
        <Route path='/onboarding' element={isAuthenticated ? (
          isOnboarded ? <Navigate to='/' /> : <OnboardingPage />
        ) : (<Navigate to='/login' />)} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App


