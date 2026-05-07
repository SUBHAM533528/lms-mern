import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t'>
      <div className='flex items-center gap-4'>
        <img src={assets.logo} alt=""  className='hidden md:block w-20 cursor-pointer'/>
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <p className='py-4 text-center text-xs md:text-sm text-gray-500'>Copyroght &copy;{currentYear} Edemy . All Right Reserved</p>
      </div>

      <div className='flex items-center gap-3 max-md:text-sm'>
        <a href="#">
          <img src={assets.facebook_icon} alt="" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="" />
        </a>
          <a href="#">
            <img src={assets.instagram_icon} alt="" />
          </a>
      </div>

    </footer>
  )
}

export default Footer