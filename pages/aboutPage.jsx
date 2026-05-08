import React from 'react';
import { FaMicrochip, FaGamepad, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="w-full min-h-screen bg-[#ffffff] text-[#0f0f0f] py-16 px-5 md:px-20 font-sans">
            
            <div className="max-w-4xl mx-auto text-center mb-20 mt-10">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                    Welcome to <br className="md:hidden" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E30B6F] to-[#8a00c4]">
                        Dawe Computers
                    </span>
                </h1>
                <p className="text-lg text-[#0f0f0f]/70 leading-relaxed max-w-2xl mx-auto">
                    Empowering your digital lifestyle with high-performance computing solutions. 
                    From custom-built gaming rigs to professional workstations, we bridge the gap 
                    between cutting-edge technology and your ambition.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                
                <div className="p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#0f0f0f]/5 hover:-translate-y-2 transition-all duration-300 bg-white group flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] flex justify-center items-center text-white text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform">
                        <FaMicrochip/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#0f0f0f]">Premium Hardware</h3>
                    <p className="text-[#0f0f0f]/60 text-sm leading-relaxed">
                        We provide a curated selection of high-performance processors, GPUs, and peripherals from top-tier global brands to power your digital world.
                    </p>
                </div>

                <div className="p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#0f0f0f]/5 hover:-translate-y-2 transition-all duration-300 bg-white group flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] flex justify-center items-center text-white text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform">
                        <FaGamepad/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#0f0f0f]">Custom PC Builds</h3>
                    <p className="text-[#0f0f0f]/60 text-sm leading-relaxed">
                        From professional editing workstations to ultimate gaming rigs, our experts engineer custom systems tailored specifically to your needs.
                    </p>
                </div>

                <div className="p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#0f0f0f]/5 hover:-translate-y-2 transition-all duration-300 bg-white group flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] flex justify-center items-center text-white text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform">
                        <FaTools/>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#0f0f0f]">Expert Support</h3>
                    <p className="text-[#0f0f0f]/60 text-sm leading-relaxed">
                        Our certified technical team offers comprehensive hardware maintenance, upgrades, and expert guidance to keep your tech running at peak speed.
                    </p>
                </div>

            </div>

            <div className="max-w-4xl mx-auto text-center p-10 rounded-3xl bg-gradient-to-r from-[#E30B6F]/10 to-[#8a00c4]/10 border border-[#8a00c4]/20">
                <h2 className="text-2xl font-bold mb-4 text-[#0f0f0f]">Ready to Upgrade Your Setup?</h2>
                <p className="text-[#0f0f0f]/70 mb-6">
                    Explore our latest collection of premium hardware, high-end gaming rigs, and professional workstations designed for the future.
                </p>
                <Link to="/" className="px-8 py-3 rounded-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] text-white font-bold shadow-lg hover:opacity-90 hover:shadow-xl transition-all hover:scale-105">
                    Back to Home
                </Link>
            </div>

        </div>
    );
}