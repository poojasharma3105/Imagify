import React from 'react';
import {assets, testimonialsData} from '../assets/assets';
import {motion} from 'framer-motion';

const Testimonials = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2, y:100 }}
    transition={{ duration: 1}}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className='flex flex-col justify-center items-center my-20 py-12'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customer Testimonials</h1>
        <p className='text-lg text-gray-600 mb-12'>What Our Users Are Saying</p>

        <div className='flex flex-wrap justify-center gap-6'>
            {testimonialsData.map((testimonial, index) => (
                <div key={index} className='p-12 bg-white/20 shadow-md rounded-lg order w-80 cursor-pointer hover:scale-[1.02] transition-all duration-300'>
                    <div className='flex flex-col items-center'>
                        <img src={testimonial.image} alt={testimonial.name} className='w-14 rounded-full object-cover' />
                        <h2 className='text-xl font-semibold mt-3'>{testimonial.name}</h2>
                        <p className='text-gray-500 mb-4'>{testimonial.role}</p>
                        <div className='flex mb-4'>
                            {Array(testimonial.stars).fill().map((item, index) => (
                                <img key={index} src={assets.rating_star} alt="rating star" className='w-4' />
                            ))}
                        </div>
                        <p className='text-gray-600 text-center text-sm'>{testimonial.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
  )
}

export default Testimonials
