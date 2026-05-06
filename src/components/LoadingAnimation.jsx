export default function LoadingAnimation() {
    return (
        <div 
            className="w-16 h-16 border-[5px] border-b-transparent border-l-transparent rounded-full animate-spin"
            style={{ 
                borderTopColor: '#E30B6F', 
                borderRightColor: '#8a00c4',
                filter: 'drop-shadow(0px 0px 10px rgba(227,11,111,0.6))'
            }}
        ></div>
    );
}