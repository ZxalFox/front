"use client";

import { useState, useEffect } from "react";

interface Emotion {
  id: number;
  title: string;
  description: string;
  intensity: number;
}

export default function EmotionsPage() {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [newEmotion, setNewEmotion] = useState({ title: "", description: "", intensity: 5 });

  useEffect(() => {
    fetch("http://localhost:3000/emotions")
      .then((res) => res.json())
      .then((data) => setEmotions(data));
  }, []);

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
    <div className="max-w-2xl mx-auto text-black p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Diário de Emoções</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg bg-gray-100">
        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 mb-2 border rounded"
          value={newEmotion.title}
          onChange={(e) => setNewEmotion({ ...newEmotion, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Descrição"
          className="w-full p-2 mb-2 border rounded"
          value={newEmotion.description}
          onChange={(e) => setNewEmotion({ ...newEmotion, description: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          max="10"
          className="w-full p-2 mb-2 border rounded"
          value={newEmotion.intensity}
          onChange={(e) => setNewEmotion({ ...newEmotion, intensity: parseInt(e.target.value) })}
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Adicionar Emoção
        </button>
      </form>

      {/* Lista de Emoções */}
      {emotions.map((emotion) => (
        <div key={emotion.id} className="border p-4 rounded-lg mb-2">
          <h2 className="text-xl font-semibold">{emotion.title}</h2>
          <p className="text-gray-600">{emotion.description}</p>
          <span className="text-sm text-gray-500">Intensidade: {emotion.intensity}/10</span>
        </div>
      ))}
    </div>
  );
}
