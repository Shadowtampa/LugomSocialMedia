import React from 'react'
import Header from '../../components/Header/Header'
import { Typography } from '@material-tailwind/react'

export const Profile = () => {
    return (
        <div className="relative grid min-h-[100vh] w-screen p-8">
            <Header />

            <Typography variant="h1">Profile</Typography>


        </div>
    )
}
