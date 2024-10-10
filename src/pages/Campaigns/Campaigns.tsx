import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../utils/truncate";
import { useEffect, useState } from "react";
import { ICampaingProps } from "../../interfaces/Campaing";
import CampaignModal from "../../components/CampaingModal/CampaingModal";
import { PublishModal } from "../../components/PublishModal/PublishModal";
import api from "../../services/api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { campaingStore } from "../../store/campaings";
import { AxiosError } from "axios";

export const Campaigns = () => {

  const showSwal = (inputValue: string) => {
    withReactContent(Swal).fire({
      title: <i>Input something</i>,
      input: 'text',
      inputValue,
    })
  }

  const [campaings, setCampaigns] = useState<ICampaingProps[]>(campaingStore.initialState);

  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [publishModalIsOpen, setPublishModalIsOpen] = useState(false);

  const [formData, setFormData] = useState<ICampaingProps>({
    id: 0,
    title: "",
    date: "",
    processed: false,
    description: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = () => {
    setFormData({
      ...formData,
      processed: !formData.processed,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      const updatedCampaigns = campaings.map(campaign =>
        campaign.id === formData.id ? { ...campaign, ...formData } : campaign
      );
      setCampaigns(updatedCampaigns);
    } else {
      setCampaigns([...campaings, { ...formData, id: campaings.length + 1 }]);
    }
    closeModal();
  };

  const handleEditModal = (campaign: ICampaingProps) => {
    setFormData(campaign);
    setIsOpen(true);
  };

  const handlePublishModal = (campaign: ICampaingProps) => {
    setPublishModalIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Função assíncrona para verificar se o usuário está logado
    const fetchUserData = async () => {

      try {
        const response = await api.get('/me');
        // Caso a resposta seja 200, não faz nada
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status !== 200) {
          navigate('/login'); // Redireciona para login se não for 200
        }
      }
    };

    fetchUserData();
  }); // O array vazio [] garante que o efeito execute apenas uma vez após o componente ser montado


  return (
    <div className="relative grid min-h-[100vh] w-screen p-8">
      <Header />
      <Typography variant="h1">Promoções</Typography>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {campaings.length > 0 ? (
          campaings.map((campaing) => (
            <Card className="w-full" key={campaing.title}>
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={campaing.image} alt="card-image" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {campaing.title} - {campaing.date}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  {truncateText(campaing.description, 50)}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                {campaing.processed ? (
                  <>
                    <Button onClick={() => handleEditModal(campaing)}>Editar</Button>
                    <Button color="green" onClick={() => handlePublishModal(campaing)}>Publicar</Button>
                  </>
                ) : (
                  <Button color="blue" onClick={() => handleEditModal(campaing)}>Gerar com IA</Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <Typography variant="h6" color="blue-gray" className="col-span-3 text-center">
            Nenhuma propaganda cadastrada!
          </Typography>
        )}
      </div>


      <CampaignModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleSubmit={handleSubmit}
      />

      <PublishModal
        isOpen={publishModalIsOpen}
        closeModal={() => setPublishModalIsOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
