"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./components/Card";

export default function Home() {
  const [apiData, setApiData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchDataFromRickAndMortyApi = async () => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const result = await response.json();
    return result as { results: Array<any> };
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDataFromRickAndMortyApi().then((result) => {
      console.log("setting to false.");
      setApiData((prevData) => [...prevData, ...result.results]);
      setIsLoading(false)
    });
  }, [page]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.onscrollend = () => {
      setPage(page + 1);
    };
  }, [scrollRef, page]);

  return (
    <>
      <div
        className="flex gap-4 max-w-screen-xl mx-auto overflow-x-scroll"
        ref={scrollRef}
      >
        {apiData.map((cardData, index) => (
          <Card
            id={cardData.id}
            name={cardData.name}
            image={cardData.image}
            status={cardData.status}
            key={index}
          />
        ))}
      </div>
      {isLoading && (
        <span className="text-3xl font-bold my-64 text-white">Loading...</span>
      )}
    </>
  );
}
