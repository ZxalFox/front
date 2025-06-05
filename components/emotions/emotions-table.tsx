import React from "react";
import { Emotion } from "./emotions-page";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

interface EmotionsTableProps {
  emotions: Array<Emotion>;
  handleDelete: (id: number) => void;
  handleEdit: (emotion: Emotion) => void;
}

const EmotionsTable = ({
  emotions = [],
  handleDelete,
  handleEdit,
}: EmotionsTableProps) => {
  return (
    <div>
      {emotions && emotions.length > 0 ? (
        emotions?.map((emotion) => (
          <div
            key={emotion.id}
            className="border border-pink-800 bg-pink-200 p-4 rounded-lg flex justify-between items-center mb-2"
          >
            <div className="w-6/12">
              <h3 className="text-lg text-pink-800 font-semibold">
                {emotion.title}
              </h3>
              <p className="text-pink-500">{emotion.description}</p>{" "}
            </div>
            <span className="w-3/12 text-lg  text-center text-pink-800">
              {emotion.intensity}
            </span>
            <div className="w-3/12 flex justify-end">
              <button
                onClick={() => handleDelete(emotion.id)}
                className="px-3 py-3 bg-pink-800 text-white rounded ml-2 hover:cursor-pointer hover:bg-pink-600 transition-colors duration-300"
              >
                <FaTrashAlt />
              </button>
              <button
                onClick={() => handleEdit(emotion)}
                className="p-3 bg-pink-500 text-white rounded ml-2 hover:cursor-pointer hover:bg-pink-400 transition-colors duration-300"
              >
                <FaPencilAlt />
              </button>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}{" "}
    </div>
  );
};

export default EmotionsTable;
