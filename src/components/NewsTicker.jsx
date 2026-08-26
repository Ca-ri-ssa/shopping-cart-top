import './NewsTicker.css'

const newsWord = [
    "Hi, welcome to Shopping Cart!",
    "There is so many new items that you can explore.",
    "Browse to infinity and beyond 🧑‍🚀."
];

const NewsTicker = () => {
    return (
        <div className='ticker-container'>
            <div className='ticker-wrapper'>
                {newsWord.map((word, index) => (
                    <span key={index} className='ticker-item'>
                        {word}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;