import { useEffect, useState } from "react";

const LoadingBar = ({ isLoading }) => {
    const display = { display: isLoading ? 'block' : 'none' };

    return (
        <div style={display}>Loading...</div>
    )
};

const ErrorBar = ({ text }) => {
    return(
        <div className="error-bar">{text}</div>
    );
};

const ShowToast = ({ marginTop = 0, text, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false)
            if (onClose) onClose();
        }, duration)

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible || !text) return null;
    
    return (
        <div style={{ marginTop: marginTop + 'px' }} className="show-toast">{text}</div>
    )
};

export { 
    LoadingBar,
    ErrorBar,
    ShowToast
};