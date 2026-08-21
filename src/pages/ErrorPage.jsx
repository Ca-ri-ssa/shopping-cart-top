import { isRouteErrorResponse, useRouteError } from "react-router";

// TODO: Error Page
const ErrorPage = () => {
    const errorStatus = useRouteError();

    let status = "Error";
    let message = "Unexpected error occured!"

    if (isRouteErrorResponse(errorStatus)) {
        status = errorStatus.status;
        message = errorStatus.statusText || errorStatus.data?.message || message;
    } else if (errorStatus?.response) {
        status = errorStatus.response.status;
        message = errorStatus.response.data?.message || "Server error occured.";
    } else if (errorStatus instanceof Error){
        message = errorStatus.message;
    }

    const errorStyle = {
        h1: {
            fontSize: "64px"
        },
        p: {
            fontSize: "32px"
        },
        marginTop: "100px"
    };

    return(
        <section id="error">
            <h1 style={errorStyle.h1}>{status}</h1>
            <p style={errorStyle.p}>{message}</p>
            <p style={errorStyle}>Go back to <a href="/">home</a></p>
        </section>
    )
};

export default ErrorPage;