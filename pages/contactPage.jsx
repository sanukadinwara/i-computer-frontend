import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
    return (
        <div className="w-full min-h-screen bg-[#ffffff] text-[#0f0f0f] py-16 px-5 md:px-20 font-sans">
            
            <div className="max-w-4xl mx-auto text-center mb-16 mt-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#E30B6F] to-[#8a00c4]">Touch</span>
                </h1>
                <p className="text-lg text-[#0f0f0f]/70 max-w-2xl mx-auto">
                    Need technical assistance or looking for your next high-performance upgrade? Drop us a message below or visit our store for expert advice and premium tech solutions.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                
                <div className="flex flex-col justify-center space-y-8 bg-[#0f0f0f]/5 p-8 rounded-3xl border border-[#0f0f0f]/10">
                    <h3 className="text-2xl font-bold mb-12">Contact Information</h3>
                    
                    <div className="flex items-center gap-5 group">
                        <div className="min-w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] flex justify-center items-center text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0f0f0f] text-lg">Location</h4>
                            <p className="text-[#0f0f0f]/70 text-sm">Colombo, Sri Lanka</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 group">
                        <div className="min-w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] flex justify-center items-center text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                            <FaEnvelope />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0f0f0f] text-lg">Email Us</h4>
                            <p className="text-[#0f0f0f]/70 text-sm">hello@dawecomputers.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 group">
                        <div className="min-w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] flex justify-center items-center text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                            <FaPhoneAlt />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0f0f0f] text-lg">Call Us</h4>
                            <p className="text-[#0f0f0f]/70 text-sm">+94 71 234 5678</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#0f0f0f]/5">
                    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                        
                        <div>
                            <label className="block text-sm font-bold text-[#0f0f0f] mb-2 pl-1">Your Name</label>
                            <input 
                                type="text" 
                                placeholder="John Doe" 
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#0f0f0f]/10 bg-[#ffffff] text-[#0f0f0f] outline-none focus:border-[#E30B6F] transition-colors duration-300"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-[#0f0f0f] mb-2 pl-1">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="john@example.com" 
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#0f0f0f]/10 bg-[#ffffff] text-[#0f0f0f] outline-none focus:border-[#8a00c4] transition-colors duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-[#0f0f0f] mb-2 pl-1">Message</label>
                            <textarea 
                                rows="4"
                                placeholder="How can we help you?" 
                                className="w-full px-4 py-3 rounded-xl border-2 border-[#0f0f0f]/10 bg-[#ffffff] text-[#0f0f0f] outline-none focus:border-[#E30B6F] transition-colors duration-300 resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#E30B6F] to-[#8a00c4] text-white font-bold text-lg shadow-md hover:opacity-90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            Send Message
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}