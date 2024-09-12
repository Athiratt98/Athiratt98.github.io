import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Content.css";
import Header from "../header/Header";

// const Content = React.memo(() => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;
//     fetch("https://test.create.diagnal.com/data/page1.json")
//       .then((response) => response.json())
//       .then((data) => {
//         if (isMounted) {
//           const movieData = data.page["content-items"].content;
//           const baseImageUrl = "https://test.create.diagnal.com/images/";
//           const moviesWithImageUrls = movieData.map((item) => ({
//             ...item,
//             "poster-image": baseImageUrl + item["poster-image"],
//           }));

//           console.log(moviesWithImageUrls, "movies");
//           setMovies(moviesWithImageUrls);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         if (isMounted) {
//           console.error("Error fetching data:", error);
//           setLoading(false);
//         }
//       });

// return () => {
//   isMounted = false;
// };
//   }, []);

const Content = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const fetchMovies = async (pageNumber) => {
    setLoading(true);
    fetch(`https://test.create.diagnal.com/data/page${pageNumber}.json`)
      .then((response) => response.json())
      .then((data) => {
        const movieData = data.page["content-items"].content;
        const baseImageUrl = "https://test.create.diagnal.com/images/";
        const moviesWithImageUrls = movieData.map((item) => ({
          ...item,
          "poster-image": baseImageUrl + item["poster-image"],
        }));

        console.log(moviesWithImageUrls, "movies");
        setMovies(moviesWithImageUrls);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(page);
  }, []);



  useEffect(() => {
    // Handler to update the scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      console.log('Current Scroll Position:', window.scrollY)
    };

    // Attach the event listener to window
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="main-container">
      <Header />
      <div className="grid-container">
        {movies.map((item, index) => (
          <div key={`${item.id}-${index}`} className="grid-item">
            <div className="image-container">
              <img src={item["poster-image"]} alt={`${item.name} poster`} />
            </div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
