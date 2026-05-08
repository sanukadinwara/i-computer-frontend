export default function getFormattedPrice(price){
    
    if(price == null){
        return "Rs. 0.00"
    }

    const priceInNumber = Number(price); 

    if(isNaN(priceInNumber)){
        return "N/A"
    }else{
        return "Rs. " + priceInNumber.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }
}