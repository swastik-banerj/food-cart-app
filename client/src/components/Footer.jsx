import React from 'react'
import { menu_list } from '../assets/assets';

const Footer = () => {
    return (
        <div className='flex flex-wrap justify-center p-4 gap-4'>

            {menu_list.map((item, index) =>
                <div key={index} className='w-[120px] aspect-square flex flex-col items-center justify-center'>
                    <img src={item.menu_image} alt={item.menu_name} className='rounded-full' />
                    <span className='text-sm text-gray-500 font-medium text-center mt-2'>{item.menu_name}</span>
                </div>
            )}
        </div>
    )
}

export default Footer;
