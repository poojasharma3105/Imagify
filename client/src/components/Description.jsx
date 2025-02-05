import React from 'react'
import {assets} from '../assets/assets';
import { motion } from "motion/react";

const Description = () => {
  return (
    <motion.div className='flex flex-col justify-center items-center my-24 p-6 md:px-28'
    initial={{ opacity: 0.2, y:100 }}
    transition={{ duration: 1}}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    >
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-lg text-gray-600 mb-8'>Turn your imagination into visuals</p>

      <div className='flex flex-col md:flex-row gap-5 md:gap-14 items-center'>
        <img src={assets.sample_img_1} alt="sample_img_1" className='w-80 xl:w-96 rounded-lg'/>
        <div>
            <h2 className='text-3xl font-md max-w-lg mb-4'>Introducing the AI_Powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Easily bring your ideas to life with our free AI image generator. 
                Whether you need stunning visuals or unique imagery, our tool transforms your text into 
                visually stunning andeye-catching images with just a few clicks. 
                Imagine it, describe it, and watch it come to life instantly.
            </p>

            <p className='text-gray-600'>Simply type in a text prompt, and our cutting-edge AI will 
                generate high-quality images in seconds. From product visuals to 
                character designs and portraits, even concepts that don’t yet exist 
                can be visualized effortlessly. Powered by advanced AI technology, 
                our generator empowers you to explorethe creative possibilities are limitless!
            </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description
