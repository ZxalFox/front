"use client";

import { useState, useEffect } from "react";
import EmotionsTable from "./emotions-table";
import AddEmotionForm from "./add-emotion-form";
import { useAuth } from "@/hooks/useAuth";

export interface Emotion {
  id: number;
  title: string;
  description: string;
  intensity: number;
}

export default function EmotionsPage() {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [editingEmotion, setEditingEmotion] = useState<Emotion | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/emotions")
      .then((res) => res.json())
      .then((data) => setEmotions(data));
  }, []);

  const handleEdit = (emotion: Emotion) => {
    setEditingEmotion(emotion);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEmotion) return;

    const response = await fetch(
      `http://localhost:3000/emotions/${editingEmotion.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEmotion),
      }
    );

    if (response.ok) {
      const updatedEmotion = await response.json();
      setEmotions(
        emotions.map((e) => (e.id === updatedEmotion.id ? updatedEmotion : e))
      );
      setEditingEmotion(null);
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3000/emotions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setEmotions(emotions.filter((emotion) => emotion.id !== id));
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-black p-6 bg-white rounded-lg shadow-md">
      <AddEmotionForm emotions={emotions} setEmotions={setEmotions} />

      {editingEmotion && (
        <form
          onSubmit={handleUpdate}
          className="mb-4 p-4 border rounded-lg bg-gray-100"
        >
          <input
            type="text"
            className="w-full p-2 mb-2 border rounded"
            value={editingEmotion.title}
            onChange={(e) =>
              setEditingEmotion({ ...editingEmotion, title: e.target.value })
            }
            required
          />
          <textarea
            className="w-full p-2 mb-2 border rounded"
            value={editingEmotion.description}
            onChange={(e) =>
              setEditingEmotion({
                ...editingEmotion,
                description: e.target.value,
              })
            }
            required
          />
          <input
            type="number"
            min="1"
            max="10"
            className="w-full p-2 mb-2 border rounded"
            value={editingEmotion.intensity}
            onChange={(e) =>
              setEditingEmotion({
                ...editingEmotion,
                intensity: parseInt(e.target.value),
              })
            }
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Atualizar Emoção
          </button>
        </form>
      )}

      <EmotionsTable
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        emotions={emotions}
      />
    </div>
  );
}
