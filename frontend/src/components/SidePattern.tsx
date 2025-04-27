import React from 'react'
import { Fan } from 'lucide-react'
import Tilt from 'react-parallax-tilt'


const SidePattern: React.FC = () => {
  return (
    <div className='full hidden lg:flex justify-center items-center'>
        <Tilt className='w-1/2 h-1/2 flex flex-col gap-2.5 bg-primary/10 rounded-3xl justify-center items-center'
        tiltMaxAngleX={16}
        tiltMaxAngleY={16}
        glareEnable={true} glareMaxOpacity={0.3}
        glareColor="lightblue"
        glarePosition="left">
        <Fan className='text-primary size-50'/>
        <h2 className='text-4xl px-4 text-center font-logo font-extrabold tracking-wider text-primary'>NEXA CHAT</h2>
        </Tilt>
    </div>
  )
}


export default SidePattern