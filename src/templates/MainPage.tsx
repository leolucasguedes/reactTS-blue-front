import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/DataTable";
import { FaRegSquarePlus } from "react-icons/fa6";
import Modal from "../components/CreateModal";
import { Data } from "../types";

function MainPage() {
  const [restaurants, setRestaurants] = useState<Data[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [hasInstagram, setHasInstagram] = useState(false);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/restaurants`);
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    let filtered = restaurants;

    if (hasEmail) {
      filtered = filtered.filter(
        (restaurant) => restaurant.email && restaurant.email.includes("@")
      );
    }

    if (hasInstagram) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.instagram && restaurant.instagram.includes("@")
      );
    }

    setFilteredRestaurants(filtered);
  }, [hasEmail, hasInstagram, restaurants]);

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
          className="absolute top-20 right-8 text-4xl cursor-pointer"
          onClick={handleOpenModal}
        />
      </div>
      <div className="flex relative">
        <div className="flex items-center absolute top-10 z-20">
          <input
            type="checkbox"
            checked={hasEmail}
            onChange={() => {
              setHasEmail(!hasEmail);
            }}
            className="ml-2"
          />
          <label className="text-custom-gray2 text-14px font-poppins ml-2 dark:text-white">
            Restaurantes com E-mail
          </label>
        </div>
        <div className="flex items-center absolute top-10 left-48 z-20">
          <input
            type="checkbox"
            checked={hasInstagram}
            onChange={() => {
              setHasInstagram(!hasInstagram);
            }}
            className="ml-2"
          />
          <label className="text-custom-gray2 text-14px font-poppins ml-2 dark:text-white">
            Restaurantes com Instagram
          </label>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <Table data={filteredRestaurants} />
    </div>
  );
}

export default MainPage;
