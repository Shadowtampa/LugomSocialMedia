import { timelineItem } from '@material-tailwind/react'
import React from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Header from '../../components/Header/Header';
import { useLocation } from 'react-router-dom';

export const Edit = () => {

    const location = useLocation();
    const { title, date, processed } = location.state || {}; // Acessa os dados passados



    return (

        <div className="relative grid min-h-[100vh] w-screen p-8">
            <Header />

            <Typography variant="h1">Editing {title}</Typography>

            <Card className="mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                        src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                        alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {title} - {date}
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop just 2 min by
                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                        night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    {
                        processed
                            ? <>
                                <Button>Reprocessar</Button>
                                <Button color="green">Publicar</Button>
                            </>
                            : <Button>Processar</Button>
                    }
                </CardFooter>
            </Card>


        </div>

    )
}




