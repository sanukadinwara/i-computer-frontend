import ProductCard from "./productCard";

export default function OnSaleNow(){
    return(
        <div>
            <h1>On Sale Now</h1>
            <ProductCard
                name= "Macbook Air"
                image= "https//picsum.photos/id/0/200/300"
                price="LKR 250,000"
                />

            <ProductCard
                name= "iPhone"
                image= "https//picsum.photos/id/3/200/300"
                price="LKR 150,000"
                />
        </div>
    )
}