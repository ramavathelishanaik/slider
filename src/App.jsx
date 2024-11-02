import { list } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useState } from "react";
const App = () => {
  const [slideData, setSlideData] = useState(list);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(slideData.length - 1);
    } else if (index > slideData.length - 1) {
      setIndex(0);
    }
  }, [index, slideData]);

  useEffect(() => {
    let timer = setInterval(() => {
      setIndex((pre) => pre + 1);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <section className="slider-container">
      {slideData.map((eachSlide, personIndex) => {
        const { id, image, name, title, quote } = eachSlide;
        let position = "nextSlide";

        if (personIndex === index) {
          position = "activeSlide";
        }
        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === slideData.length - 1)
        ) {
          position = "lastSlide";
        }

        return (
          <article key={id} className={position}>
            <img
              src={image}
              alt={name}
              className="person-img mx-auto"
            />
            <h4 className="name">{name}</h4>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="mx-auto icon" />
          </article>
        );
      })}
      <button className="prev" onClick={() => setIndex(index - 1)}>
        <FiChevronLeft />
      </button>
      <button className="next" onClick={() => setIndex(index + 1)}>
        <FiChevronRight />
      </button>
    </section>
  );
};
export default App;
