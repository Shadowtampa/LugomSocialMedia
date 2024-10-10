import React, { ChangeEvent, FormEvent } from "react";
import { Card, CardHeader, CardBody, CardFooter, Input, Switch, Button, Typography } from "@material-tailwind/react";
import ReactModal from "react-modal";
import { ICampaingProps } from "../../interfaces/Campaing";

interface CampaignModalProps {
    isOpen: boolean;
    closeModal: () => void;
    formData: ICampaingProps;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSwitchChange: () => void;
    handleSubmit: (e: FormEvent) => void;
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

const CampaignModal: React.FC<CampaignModalProps> = ({
    isOpen,
    closeModal,
    formData,
    handleChange,
    handleSwitchChange,
    handleSubmit,
}) => {
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
                        Criar Nova Campanha
                    </Typography>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            crossOrigin
                            label="Título"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            crossOrigin
                            type="date"
                            label="Data"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            crossOrigin
                            label="Descrição"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            crossOrigin
                            label="URL da Imagem"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />

                        <div className="flex items-center gap-2">
                            <Switch
                                crossOrigin
                                id="processed"
                                checked={formData.processed}
                                onChange={handleSwitchChange}
                            />
                            <label htmlFor="processed" className="text-blue-gray-600">
                                Processada
                            </label>
                        </div>
                    </form>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button fullWidth onClick={handleSubmit} color="green">
                        Salvar
                    </Button>
                </CardFooter>
            </Card>
        </ReactModal>
    );
};

export default CampaignModal;
