import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="flex flex-col justify-center items-center min-h-[90vh] px-4"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <div className="w-full max-w-lg">
        <div className="relative">
          <img src={image} alt="Generated" className="max-w-full w-auto rounded shadow-md" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? 'w-full transition-all duration-[10s]' : 'w-0'
            }`}
          ></span>
        </div>
        {loading && <p className="text-center text-gray-600 mt-2">Loading...</p>}
      </div>

      {/* Input & Button Section */}
      {!isImageLoaded && (
        <div className="flex flex-col sm:flex-row items-center w-full max-w-xl bg-neutral-500 text-white text-sm mt-10 rounded-3xl">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none px-4 py-3 placeholder-gray-300 w-full sm:w-auto  "
          />
          <button
            type="submit"
            className="bg-zinc-900 px-8 sm:px-16 py-3 rounded-full text-white mt-2 sm:mt-0 sm:ml-2 w-full sm:w-auto"
          >
            Generate
          </button>
        </div>
      )}

      {/* Buttons after Image Generation */}
      {isImageLoaded && (
        <div className="flex flex-col sm:flex-row gap-4 mt-10 text-white text-sm w-full max-w-lg">
          <button
            onClick={() => setIsImageLoaded(false)}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer w-full sm:w-auto"
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer w-full sm:w-auto text-center"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
