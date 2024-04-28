import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/DataTable";
import { FaRegSquarePlus } from "react-icons/fa6";
import Modal from "../components/CreateModal";

function MainPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-2">
      <div className="relative z-20">
        <FaRegSquarePlus
          className="absolute top-5 right-8 text-4xl cursor-pointer"
          onClick={handleOpenModal}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Table data={restaurants} />
    </div>
  );
}

export default MainPage;
