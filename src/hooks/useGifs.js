import { useEffect, useState, useCallback } from "react";

const useGifs = () => {
  const [gifList, setGifList] = useState([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/gifs.json");
        if (!response.ok) {
          throw new Error("error: " + response.status);
        }
        const data = await response.json();
        setGifList(data.gifs);
        const randomIndex = Math.floor(Math.random() * data.gifs.length);
        setCurrentGifIndex(randomIndex);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const selectRandomGif = useCallback(() => {
    if (gifList.length > 0) {
      const randomIndex = Math.floor(Math.random() * gifList.length);
      setCurrentGifIndex(randomIndex);
    }
  }, [gifList.length]);

  return {
    currentGif: gifList[currentGifIndex],
    currentGifIndex,
    selectRandomGif: selectRandomGif,
  };
};

export default useGifs;
