export default function CardLayout({ category }) {
    return(
        <div className="w-72 flex-none rounded-lg bg-white overflow-hidden p-2 border-2">
            <div className="w-full overflow-hidden">
                <img src={category.image} alt="banner" className="w-full h-40 "/>
            </div>
            <div className="p-4 pt-0">
                <h2 className="text-cyan-900 text-bold py-2 text-lg tracking-wide">{category.name}</h2>
            </div>
        </div>
    );
}