"use client";

import { useEffect } from "react";

// interface Entry {
//   id: number;
//   title: string;
//   content: string;
// }

export default function HomePage() {
//   const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/entries")
      .then((res) => res.json())
    //   .then((data) => setEntries(data));
  }, []);

  return (
    <div className="bg-black">
      <h1>Diário de Emoções</h1>
      {/* {entries?.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
        </div>
      ))} */}
    </div>
  );
}
