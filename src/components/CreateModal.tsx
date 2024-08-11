import React, { useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ isOpen, onClose }) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    foodType: "",
    instagram: "",
  });

  function postNew(e: any) {
    setLoading(true);
    e.preventDefault();
    const promise = axios.post(`${apiUrl}/restaurants`, data);
    promise.then((res) => {
      setLoading(false);
      window.location.href = '/restaurants';
    });
    promise.catch((e) => {
      const message = e.response.data;
      setLoading(false);
      alert(`Dados inválidos: ${message}`);
    });
  }

  function Button() {
    if (!loading) {
      return (
        <button
          className="w-72 h-10 mt-4 bg-blue-500 hover:bg-blue-700 text-12px text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Salvar
        </button>
      );
    }
    if (loading) {
      return (
        <button>
          <div className="loading w-72 h-10 mt-4 bg-blue-500 hover:bg-blue-700 text-12px text-white font-bold py-2 px-4 rounded" />
        </button>
      );
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-lg p-8 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={onClose}
            >
              <MdClose className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Novo Contato</h2>
            <form onSubmit={postNew}>
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                placeholder="Nome"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                value={data.name}
                required
              />
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                placeholder="Endereço"
                onChange={(e) => setData({ ...data, address: e.target.value })}
                value={data.address}
                required
              />
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                placeholder="Email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                required
              />
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                placeholder="Telefone"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                value={data.phone}
                required
              />
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                placeholder="Tipo de Comida"
                onChange={(e) => setData({ ...data, foodType: e.target.value })}
                value={data.foodType}
                required
              />
              <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
                placeholder="Instagram"
                onChange={(e) => setData({ ...data, instagram: e.target.value })}
                value={data.instagram}
                required
              />
              <Button />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
