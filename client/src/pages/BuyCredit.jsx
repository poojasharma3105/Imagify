import React, { useContext } from 'react';
import {assets, plans} from '../assets/assets';
import {AppContext} from '../context/AppContext';
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BuyCredit = () => {

  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);

  const navigate = useNavigate();

  const initPay = async(order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try{
          console.log("Razorpay Payment Response:", response);
          const {data} = await axios.post(backendUrl + "/api/user/verify-payment", {razorpay_order_id: response.razorpay_order_id}, {headers: {token}});
          console.log("Verify Payment API Response:", data); // Debug API response

          if(data.success){
            await loadCreditsData();
            navigate("/");
            toast.success("Credits added");
          }
        }catch(e){
          toast.error(e.message);
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }
  const paymentRazorpay = async (planId) => {
       try{
        if(!user){
          setShowLogin(true);
        }

        const {data} = await axios.post(backendUrl + "/api/user/payment", {planId}, {headers: {token}});

        if(data.success){
          initPay(data.order);
        }
       }catch(e){
        toast.error(e.message);
       }
  }

  return (
    <motion.div 
    className='min-h-[80vh] text-center pt-14 mb-10'
    initial={{ opacity: 0.2, y:100 }}
    transition={{ duration: 1}}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan that works for you</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((plans, index) => (
          <div key={index}
          className='bg-white drop-shadow-smborder rounded-lg py-12 px-8
          text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={40} src={assets.logo_icon} alt="logo_icon" />
            <p className='mt-3 mb-1 font-semibold'>{plans.id}</p>
            <p className='text-sm'>{plans.desc}</p>
            <p className='mt-6'><span className='text-2xl font-medium'>Rs.{plans.price} </span>/ {plans.credits} credits</p>
            <button onClick={() => paymentRazorpay(plans.id)} className='w-full bg-gray-800 text-white mt-8 text-sm 
              rounded-md py-2.5 min-w-52 cursor-pointer'>
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
