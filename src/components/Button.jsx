const Button = ({ 
    fontSize = 16, 
    text,
    width,
    paddingInline = 0,
    action
}) => {
    const isWidth = typeof width === "number" 
        ? { width: `${width}px`}
        : { width: "fit-content", paddingInline: `${paddingInline}px` };

    const btnStyle = {
        fontSize: `${fontSize}px`,
        ...isWidth
    };

    return (
        <button type="button" style={btnStyle} className="btn" onClick={action}>
            {text}
        </button>
    )
}

export {
    Button
};