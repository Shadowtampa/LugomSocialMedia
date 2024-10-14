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
import { FavButton } from "../../components/FAV/FAV";

export const Campaigns = () => {

  const showSwal = (inputValue: string) => {
    withReactContent(Swal).fire({
      title: <i>Input something</i>,
      input: 'text',
      inputValue,
    })
  }

  const StoreId = campaingStore.storeID;

  const [campaings, setCampaigns] = useState<ICampaingProps[]>(campaingStore.campaings);

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

  const handleGenerateWithAI = async (campaign: ICampaingProps) => {

    const getCampaingCopy = async (
      campaign: ICampaingProps,
      language: 'formal' | 'informal',
      audience: { minAge: number; maxAge: number },
      socialNetwork: 'Twitter' | 'Instagram' | 'Facebook',
      benefit: string, // Adicionando o benefício
      uniqueAspect: string, // Adicionando o aspecto único
      hashtags?: string // Adicionando hashtags como opcional
    ) => {
      try {
        // Monta o payload para enviar ao endpoint
        const payload = {
          product_service: campaign.title ? campaign.title : campaign.description, // Utilizando o título como produto/serviço
          benefit, // Passando o benefício
          audience: audience.minAge + '-' + audience.maxAge, // Formatação do público alvo
          language,
          hashtags: hashtags || undefined, // Adiciona hashtags se disponíveis
          unique_aspect: uniqueAspect || undefined, // Passando o aspecto único
        };

        // Faz a requisição para a API de geração de campanha via IA
        const response = await api.post('/ai/generatecampaing/', payload);

        // Pega a resposta da API
        const generatedCampaing = response.data;

        // Atualiza o estado da campanha no store e localmente
        const updatedCampaing = {
          ...campaign,
          title: generatedCampaing.generated_title, // Atualiza o título com o texto gerado
          description: generatedCampaing.generated_text, // Atualiza a descrição com o texto gerado
          processed: true, // Marca como processada
        };

        // Atualiza no campaingStore (atualizando diretamente o array)
        const updatedCampaings = campaingStore.campaings.map(c =>
          c.id === campaign.id ? updatedCampaing : c
        );
        campaingStore.setCampaings(updatedCampaings);

        // Atualiza no componente local
        setCampaigns(prevState =>
          prevState.map(c => c.id === campaign.id ? updatedCampaing : c)
        );
      } catch (error) {
        console.error('Erro ao gerar campanha com IA', error);
      }
    };

    await getCampaingCopy(
      campaign,
      "formal",
      {
        minAge: 16,
        maxAge: 28
      },
      "Twitter",
      campaign.description,
      "",
      "");

  }

  const handleEditModal = (campaign: ICampaingProps) => {
    setFormData(campaign);
    setIsOpen(true);
  };

  const handlePublishModal = (campaign: ICampaingProps) => {
    setPublishModalIsOpen(true);
  };

  const handlePublishCampaing = (campaign: ICampaingProps) => {
    // Atualizar a campanha correspondente no array de campanhas
    const updatedCampaings = campaings?.map((item: ICampaingProps) => 
      item.id === campaign.id 
        ? { 
            ...item, 
            description: campaign.description, 
            title: campaign.title, 
            image: campaign.image, 
            processed: true 
          } 
        : item
    );
  
    // Atualizar o estado no campaingStore e no estado local
    campaingStore.setCampaings(updatedCampaings);
    setCampaigns(updatedCampaings);
  
    // Fechar o modal
    setIsOpen(false);
  };
  
  


  useEffect(() => {
    // Função assíncrona para verificar se o usuário está logado
    const fetchUserData = async () => {

      try {
        await api.get('/me');
        fetchStoreCampaings()
      } catch (error) {
        if (error instanceof AxiosError && (error.response?.status !== 200 && error.response?.status !== 429)) {
          navigate('/login'); // Redireciona para login se não for 200
        }
      }
    };

    const fetchStoreCampaings = async () => {
      try {
        const response = await api.get(`/sale/getsalebystore/${StoreId}`);
        const sales = response.data.sales;

        const formattedCampaings = sales.map((sale: any) => {
          // Cria um objeto Date a partir da string da data
          const date = new Date(sale.created_at);
          // Formata a data para DD-MM
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;

          return {
            id: sale.id,
            title: sale?.title,
            date: formattedDate, // Atualiza a data formatada
            description: sale.description,
            processed: false,
            image: '',
          };
        });

        campaingStore.setCampaings([...formattedCampaings, {
          "id": 2,
          "date": "15-09",
          "description": "Semana da coca",
          "processed": true,
          "image": "",
          "title": "PENISMAN"
        }]); // Atualiza o estado no campaingStore
        setCampaigns([...formattedCampaings, {
          "id": 2,
          "date": "15-09",
          "description": "Semana da coca",
          "processed": true,
          "image": "",
          "title": "PENISMAN"
        }]); // Atualiza o estado no campaingStore
      } catch (error) {
        console.error('Erro ao buscar campanhas', error);
      }
    };




    fetchUserData();
  }, []); // O array vazio [] garante que o efeito execute apenas uma vez após o componente ser montado

  return (
    <div className="relative grid min-h-[100vh] w-screen p-8">
      <Header />
      <Typography variant="h1">Promoções</Typography>
      <span>Próxima busca em 05:00</span>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {campaings.length > 0 ? (
          campaings.map((campaing) => (
            <Card className="w-full" key={campaing.id}>
              <CardHeader color="blue-gray" className="relative h-56">
                <img src="https://placehold.co/600x400/grey/white?text=Imagem+indisponível%0AEm+breve+suporte+será+adicionado&size=40" alt="card-image" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {campaing.title ? campaing.title : "Ainda sem título"} - {campaing.date}
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
                  <Button color="blue" onClick={() => handleGenerateWithAI(campaing)}>Gerar com IA</Button>
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
        handleSubmit={handlePublishCampaing}
      />

      <PublishModal
        isOpen={publishModalIsOpen}
        closeModal={() => setPublishModalIsOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
      />

      <FavButton />
    </div>
  );
};
