import React, { ChangeEvent, FormEvent, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Switch, Typography } from "@material-tailwind/react";
import ReactModal from "react-modal";
import { ICampaingProps } from "../../interfaces/Campaing";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

interface CampaignModalProps {
    isOpen: boolean;
    closeModal: () => void;
    formData: ICampaingProps;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSwitchChange: () => void;
    handleSubmit: (campaign: ICampaingProps) => void;
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export const PublishModal: React.FC<CampaignModalProps> = ({
    isOpen,
    closeModal,
    formData,
    handleChange,
    handleSwitchChange,
    handleSubmit,
}) => {
    const [facebookEnabled, setFacebookEnabled] = useState(false);
    const [instagramEnabled, setInstagramEnabled] = useState(false);
    const [twitterEnabled, setTwitterEnabled] = useState(false);
    const [linkedinEnabled, setLinkedinEnabled] = useState(false);

    const IconSize = 50;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Campaign Modal"
        >
            <Card className="max-w-xl mt-10 shadow-lg">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                        src={formData.image || "https://via.placeholder.com/800x400.png?text=No+Image"}
                        alt="campaign"
                        className="object-cover w-full h-full"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                        Escolha as redes sociais
                    </Typography>

                    <div className="flex items-center justify-between mb-4">
                        <FaFacebook size={IconSize} />
                        <Switch
                            crossOrigin
                            checked={facebookEnabled}
                            onChange={() => setFacebookEnabled(!facebookEnabled)}
                            color="blue"
                            disabled
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <FaInstagram size={IconSize} />
                        <Switch
                        disabled
                            crossOrigin
                            checked={instagramEnabled}
                            onChange={() => setInstagramEnabled(!instagramEnabled)}
                            color="pink"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <FaTwitter size={IconSize} />
                        <Switch
                            crossOrigin
                            checked={twitterEnabled}
                            onChange={() => setTwitterEnabled(!twitterEnabled)}
                            color="light-blue"
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <FaLinkedin size={IconSize} />
                        <Switch
                        disabled
                            crossOrigin
                            checked={linkedinEnabled}
                            onChange={() => setLinkedinEnabled(!linkedinEnabled)}
                            color="blue"
                        />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button fullWidth onClick={() => handleSubmit(formData)} color="green">
                        Salvar
                    </Button>
                </CardFooter>
            </Card>
        </ReactModal>
    );
};
