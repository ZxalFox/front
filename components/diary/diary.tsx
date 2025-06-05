"use client";
import { DiaryEntry, Emotions } from "@/types/emotion";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Diary = () => {
  const [emotion, setEmotion] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<Array<DiaryEntry>>([]);
  const [emotions, setEmotions] = useState<Array<Emotions>>([]);

  const fetchDiaryEntries = async () => {
    try {
      const response = await fetch("http://localhost:3000/diary_entries");
      if (!response.ok) {
        throw new Error("Erro ao buscar entradas do diário");
      }
      const data: Array<DiaryEntry> = await response.json();
      setEntries(data);
    } catch (error) {
      toast.error("Erro ao buscar entradas do diário");
      console.error("Erro ao buscar entradas do diário:", error);
    }
  };

  const fetchEmotions = async () => {
    try {
      const response = await fetch("http://localhost:3000/emotions");
      if (!response.ok) {
        throw new Error("Erro ao buscar emoções");
      }
      const data: Array<Emotions> = await response.json();
      setEmotions(data);
    } catch (error) {
      toast.error("Erro ao buscar emoções");
      console.error("Erro ao buscar emoções:", error);
    }
  };

  useEffect(() => {
    fetchDiaryEntries();
    fetchEmotions();
  }, []);

  const handleSave = async () => {
    if (!emotion || !note) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const response = await fetch("http://localhost:3000/diary_entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: new Date().toISOString(), emotion, note }),
    });

    if (response.ok) {
      toast.success("Registro salvo com sucesso!");
      setEmotion("");
      setNote("");
      fetchDiaryEntries();
    } else {
      toast.error("Erro ao salvar o registro");
      console.error("Erro ao salvar o registro:", response);
    }
  };

  return (
    <div className="container bg-pink-300 mx-auto p-4 min-h-screen">
      <div className="mx-64 px-20 py-12 rounded-xl text-pink-700 bg-pink-200">
        <h2 className="text-center text-2xl">
          Registro do Diário - {new Date().toLocaleDateString()}
        </h2>
        <div className="flex flex-col items-center space-y-4 mt-6">
          <div className="relative">
            <select
              className="border hover:cursor-pointer rounded-xl py-3 ps-4 pe-8 appearance-none text-pink-200 bg-pink-700"
              onChange={(e) => setEmotion(e.target.value)}
              value={emotion}
            >
              <option value="">Selecione uma emoção</option>
              {emotions.map((emo) => (
                <option key={emo.id} value={emo.title}>
                  {emo.title}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <textarea
            className="w-full border rounded-xl p-4 text-pink-700 h-48"
            placeholder="Escreva sua anotação..."
            onChange={(e) => setNote(e.target.value)}
            value={note}
          ></textarea>
          <button
            className="border px-3 py-1 rounded-xl hover:bg-pink-700 hover:text-white hover:border-white hover:cursor-pointer"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>

        <h3 className="text-2xl text-center mt-12 mb-6">
          Registros anteriores
        </h3>
        <div className="flex flex-col">
          {entries.map((entry) => {
            const formattedDate = new Date(entry?.created_at).toLocaleString(
              "pt-BR",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return (
              <div key={entry?.id} className="flex bg-pink-100">
                <div className="border-pink-300 text-nowrap border px-3 py-1 text-pink-600">
                  <strong>{formattedDate}</strong>{" "}
                </div>
                <div className="border border-pink-300 w-60 text-center px-6 pt-1">
                  {" "}
                  {entry?.emotion}
                </div>
                <div className="border-pink-300 w-full border px-3 py-1 text-pink-600">
                  {entry?.note}{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Diary;
