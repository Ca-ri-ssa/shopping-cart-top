import { useEffect, useRef } from "react";

const DialogPopUp = ({ title, message, onConfirm, onClose, textConfirm, textClose }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) {
            dialog.showModal();
        }
    }, []);

    const dialogStyles = {
        layout:{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '40px',
            borderRadius: 'var(--container-radius)',
            border: 'none',
            boxShadow: 'var(--container-box-shadow)',
            color: 'var(--color-primary)',
            maxWidth: '560px',
        },
        text: {
            title: {
                textAlign: "center",
                marginBottom: '20px',
            },
            message: {
                marginBottom: "20px",
            }
        },
        btnContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            justifyContent: 'end',
        },
        btnConfirm: {
            paddingBlock: 'var(--button-padding-block)',
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onClose();
    }

    return (
        <dialog
        ref={dialogRef}
        style={dialogStyles.layout}
        onCancel={handleCancel}
        >
            <style>{`
                dialog::backdrop {
                    background-color: #ee26c310;
                    backdrop-filter: blur(2px);
                }
            `}</style>
            <h2 style={dialogStyles.text.title}>{title}</h2>
            <div style={dialogStyles.text.message}>{message}</div>
            <div style={dialogStyles.btnContainer}>
                <button onClick={onConfirm} style={dialogStyles.btnConfirm} className="btn">{textConfirm}</button>
                <button onClick={onClose} style={dialogStyles.btnClose} className="btn btn-dialog-remove">{textClose}</button>
            </div>
        </dialog>
    );
};

export default DialogPopUp;