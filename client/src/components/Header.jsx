import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { motion } from "motion/react";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();

    const onClickHandler = () => {
        if (user) {
            navigate('/result');
        } else {
            setShowLogin(true);
        }
    }

    return (
        <motion.div className='flex flex-col justify-center items-center 
    text-center my-20'
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <motion.div className='inline-flex items-center gap-2 
        text-stone-500 bg-white px-6 py-1 rounded-full border
        border-neutral-500'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <p> Best text to image generator</p>
                <img src={assets.star_icon} alt="star icon" />
            </motion.div>

            <motion.h1 className='text-3xl max-w-[300px] sm:text-5xl
        sm:max-w-[590px] mx-auto mt-10 text-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.4 }}
            >
                Turn your text into
                <span className='text-blue-600'> stunning visuals</span>, in seconds.
            </motion.h1>

            <motion.p className='text-center max-w-xl mx-auto mt-5'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                Unleash your creativity with our easy-to-use text to image generator. Simply enter your text and watch as our cutting-edge AI transforms it into stunning visuals.
            </motion.p>

            <motion.button
                onClick={onClickHandler}
                className='flex items-center gap-2 sm:gap-3 rounded-full 
        bg-black text-white sm:text-lg w-auto mt-8 px-12 py-2.5 cursor-pointer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.8 }, opacity: { duration: 1, delay: 0.8 } }}
            >
                Generate Images
                <img className='w-6' src={assets.star_group} alt="star_group" />
            </motion.button>

            <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                {Array(6).fill().map((_, index) => (
                    <motion.img
                        whileHover={{ scale: 1.05, duration: 0.1 }}
                        className='rounded hover:scale-105 transition-all 
                duration-300 cursor-pointer max-sm:w-10'
                        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                        alt="sample_img" key={index} width={70} />
                ))}
            </motion.div>

            <motion.p className='mt-2 text-neutral-600'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
            >
                Generated images from imagify
            </motion.p>
        </motion.div >
    )
}

export default Header
