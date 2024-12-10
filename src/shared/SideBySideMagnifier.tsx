import React, { useRef, useState, useEffect } from "react";

interface MagnifierProps {
  images: string[];
}

const SideBySideMagnifier: React.FC<MagnifierProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const magnifierRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      magnifierRef.current!.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => {
    setIsZoomVisible(true);
  };

  const handleMouseLeave = () => {
    setIsZoomVisible(false);
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start">
      <div className="lg:mr-4 lg:flex lg:flex-col lg:space-y-2 lg:order-1 order-2 flex space-x-2 lg:space-x-0 overflow-x-auto lg:overflow-x-visible lg:mt-0 mt-4">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Thumbnail ${index}`}
            className="w-12 h-12 md:w-12 md:h-12 object-cover cursor-pointer border border-gray-300 rounded"
            onClick={() => handleThumbnailClick(imageUrl)}
          />
        ))}
      </div>
      <div className="relative flex border border-gray-300 order-1 lg:order-2">
        <div
          ref={magnifierRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[300px] md:h-[500px] lg:h-[500px] overflow-hidden border-r border-gray-300"
        >
          <img
            src={currentImage}
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`absolute left-full top-0 w-3/4 h-full bg-no-repeat bg-cover z-10 ${
            isZoomVisible ? "block" : "hidden"
          }`}
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: "300%",
          }}
        />
      </div>
    </div>
  );
};

export default SideBySideMagnifier;
