import { useState } from "react";

export default function ImageSlideShow(props){
    const images = props.images;
    const [activeImage, setActiveImage] = useState(0);

    function getClasses (index) {
        if (index=== activeImage) {
            return "w-[90px] h-[90px] object-contain rounded-[20px] border-4 border-secondary cursor-pointer"
        }else{
            return "w-[90px] h-[90px] object-contain rounded-[20px] border-4 border-accent cursor-pointer"
        }    
    }
    return(
        <div className="w-[500px] h-[600px] flex flex-col gap-6"> 
            <div className="w-full h-full p-2 bg-white rounded-2xl drop-shadow-xl">
                <img src={images[activeImage]} className="h-full w-full object-contain rounded-xl"/>
            </div>

            <div className="w-full h-[100px] flex flex-row px-4 gap-4 justify-center items-center">
                {
                    images.map((img, index) => {
                        return (
                            <div 
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`rounded-[20px] p-[3px] cursor-pointer transition-all duration-300 ${
                                    index === activeImage 
                                    ? "bg-accent scale-105 shadow-md" 
                                    : "bg-transparent hover:bg-accent/30" 
                                }`}
                            >
                                <img 
                                    src={img} 
                                    className="w-[84px] h-[84px] object-contain rounded-[17px] bg-white" 
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
)
}