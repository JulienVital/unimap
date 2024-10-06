"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import graphJson from "@/app/data/data.json";
import { Graph } from "@/app/data/Graph";
import { GraphInterfaceRaw } from "../data/data";
// Exemple de salles disponibles (vous pouvez les remplacer par des données réelles)
// const classrooms = [
//   { id: "classroomA", name: "Salle A" },
//   { id: "classroomB", name: "Salle B" },
//   { id: "classroomC", name: "Salle C" },
//   { id: "doorA", name: "Porte A" },
//   { id: "doorB", name: "Porte B" },
// ];
const graph = new Graph(graphJson as GraphInterfaceRaw);
const classrooms = graph.getClassroomOnly()
const PathForm = () => {
  const router = useRouter(); // Pour la redirection
  const [startRoom, setStartRoom] = useState<string>("");
  const [endRoom, setEndRoom] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    // Rediriger vers /path avec les paramètres
    router.push(`/path?startId=${startRoom}&endId=${endRoom}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Choisissez votre chemin</h2>
      
      <div className="mb-4">
        <label htmlFor="startRoom" className="block text-sm font-medium text-gray-700">
          Salle de départ
        </label>
        <select
          id="startRoom"
          value={startRoom}
          onChange={(e) => setStartRoom(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>
            Sélectionnez une salle
          </option>
          {classrooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.id}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="endRoom" className="block text-sm font-medium text-gray-700">
          Salle d arrivée
        </label>
        <select
          id="endRoom"
          value={endRoom}
          onChange={(e) => setEndRoom(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>
            Sélectionnez une salle
          </option>
          {classrooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.id}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Trouver le chemin
      </button>
    </form>
  );
};

export default PathForm;
