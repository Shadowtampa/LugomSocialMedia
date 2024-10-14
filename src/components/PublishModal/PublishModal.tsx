import React, { ChangeEvent, FormEvent, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Switch, Typography } from "@material-tailwind/react";
import ReactModal from "react-modal";
import { ICampaingProps } from "../../interfaces/Campaing";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import api from "../../services/api";

interface CampaignModalProps {
    isOpen: boolean;
    closeModal: () => void;
    formData: ICampaingProps;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSwitchChange: () => void;
    handleSubmit?: (campaign: ICampaingProps) => void;
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
}) => {
    const [facebookEnabled, setFacebookEnabled] = useState(false);
    const [instagramEnabled, setInstagramEnabled] = useState(false);
    const [twitterEnabled, setTwitterEnabled] = useState(true);
    const [linkedinEnabled, setLinkedinEnabled] = useState(false);

    const getButtonTitle = () => {
        const selectedPlatforms = [];

        if (twitterEnabled) selectedPlatforms.push("Twitter");
        if (facebookEnabled) selectedPlatforms.push("Facebook");
        if (instagramEnabled) selectedPlatforms.push("Instagram");
        if (linkedinEnabled) selectedPlatforms.push("LinkedIn");

        if (selectedPlatforms.length === 0) {
            return "Nenhuma rede social selecionada!";
        }

        // Montar o título: "Publicar em X" ou "Publicar em X, Y, Z..."
        return `Publicar em ${selectedPlatforms.join(", ")}`;
    };

    const isDisabled = !twitterEnabled && !facebookEnabled && !instagramEnabled && !linkedinEnabled;



    const IconSize = 50;

    const handleSubmit = async (campaign: ICampaingProps) => {
        try {
            // Preparando o payload para a API
            const payload = {
                text: `${campaign.title} ${campaign.description}`, // Supondo que "campaign" contém um campo "text"
            };

            // Fazendo a requisição para o endpoint de publicação de campanha
            const response = await api.post('/twitter/publishcampaing/', payload);

            // Se a requisição for bem-sucedida, a resposta será mostrada no console
            const tweetId = response.data?.data?.data?.id;

            if (tweetId) {
                // Gerar o link do tweet
                const tweetLink = `https://x.com/x/status/${tweetId}`;

                // Exibir um alerta com o link para o tweet publicado
                alert(`Tweet publicado com sucesso! Veja o tweet aqui: ${tweetLink}`);
            } else {
                // Caso não haja ID na resposta, exibir um alerta com uma mensagem de sucesso genérica
                alert('Tweet publicado com sucesso, mas o link não pôde ser gerado.');
            }
        } catch (error) {
            // Caso ocorra um erro, ele será tratado no interceptador
            console.error('Erro ao enviar a campanha:', error);
        }
    };

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
                    <Button
                        fullWidth
                        onClick={() => handleSubmit(formData)}
                        color="green"
                        disabled={isDisabled} // Desabilita o botão quando não há redes sociais
                    >
                        {getButtonTitle()}
                    </Button>
                </CardFooter>
            </Card>
        </ReactModal>
    );
};
