"use client";

import React from "react";
import { Emotion } from "./emotions-page";
import { FaPlus } from "react-icons/fa";

interface AddEmotionFormProps {
  setEmotions: React.Dispatch<React.SetStateAction<Emotion[]>>;
  emotions: Emotion[];
}

const AddEmotionForm = ({ setEmotions, emotions }: AddEmotionFormProps) => {
  const [showForm, setShowForm] = React.useState(false);
  const [newEmotion, setNewEmotion] = React.useState({
    title: "",
    description: "",
    intensity: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/emotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmotion),
    });

    if (response.ok) {
      const emotion = await response.json();
      setEmotions([...emotions, emotion]);
      setNewEmotion({ title: "", description: "", intensity: 5 });
    }
  };

  return (
    <div>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 flex gap-2 items-center py-2 bg-pink-700 text-white rounded mb-4 hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border transition-colors duration-300"
        >
          <FaPlus /> Adicionar Emoção
        </button>
      )}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 p-4 border-pink-400 rounded-lg bg-pink-100"
        >
          <input
            type="text"
            placeholder="Título"
            className="w-full p-2 mb-2 text-pink-700 border-pink-300 border rounded"
            value={newEmotion.title}
            onChange={(e) =>
              setNewEmotion({ ...newEmotion, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Descrição"
            className="w-full p-2 mb-2 border text-pink-700 border-pink-300 rounded"
            value={newEmotion.description}
            onChange={(e) =>
              setNewEmotion({ ...newEmotion, description: e.target.value })
            }
            required
          />
          <input
            type="number"
            min="1"
            max="10"
            className="w-full text-pink-700 p-2 mb-2 border border-pink-300 rounded"
            value={newEmotion.intensity}
            onChange={(e) =>
              setNewEmotion({
                ...newEmotion,
                intensity: parseInt(e.target.value),
              })
            }
            required
          />
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-white text-pink-700 border border-pink-700 hover:bg-pink-700 hover:border-white hover:text-white duration-300 transition-all rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-700 text-white rounded hover:bg-white hover:text-pink-700 hover:border-pink-700 hover:border transition-colors duration-300"
            >
              Adicionar Emoção
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEmotionForm;
