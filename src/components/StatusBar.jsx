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

const ShowToast = ({ text, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
            if (onClose) onClose();
        }, duration)

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible || !text) return null;
    
    return (
        <div className="show-toast">{text}</div>
    )
};

export { 
    LoadingBar,
    ErrorBar,
    ShowToast
};