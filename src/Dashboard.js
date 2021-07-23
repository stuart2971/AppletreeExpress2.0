import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
    const [status, setStatus] = useState("");
    const [AOCStatus, setAOCStatus] = useState("");
    const history = useHistory();
    useEffect(async () => {
        let isOpen = await (
            await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/admin/isOpen`)
        ).json();
        if (isOpen.isOpen) setStatus("OPEN");
        else setStatus("CLOSED");
    });
    function getPassword() {
        return history.location.pathname.split("/")[2];
    }
    async function openWebsite() {
        let response = await (
            await fetch(
                `${
                    process.env.REACT_APP_SERVER_DOMAIN
                }/admin/open/${getPassword()}`
            )
        ).json();
        console.log(response);
        if (response.status == 200) setStatus("OPEN");
    }
    async function closeWebsite() {
        let response = await (
            await fetch(
                `${
                    process.env.REACT_APP_SERVER_DOMAIN
                }/admin/close/${getPassword()}`
            )
        ).json();
        if (response.status == 200) setStatus("CLOSED");
    }
    async function enableAOC() {
        let response = await (
            await fetch(
                `${
                    process.env.REACT_APP_SERVER_DOMAIN
                }/admin/enableAOC/${getPassword()}`
            )
        ).json();
        if (response.status == 200)
            setAOCStatus("Auto Opener/Closer is ENABLED");
    }
    async function disableAOC() {
        let response = await (
            await fetch(
                `${process.env.REACT_APP_SERVER_DOMAIN}/admin/disableAOC/${getPassword}`
            )
        ).json();
        if (response.status == 200)
            setAOCStatus("Auto Opener/Closer is DISABLED");
    }
    return (
        <div>
            <h1>Website is {status} </h1>
            <button onClick={openWebsite} className="w-button admin_button">
                Open Website
            </button>
            <button onClick={closeWebsite} className="w-button admin_button">
                Close Website
            </button>
            <br />
            <h1> {AOCStatus} </h1>
            <button onClick={enableAOC} className="w-button admin_button">
                Enable AOC
            </button>
            <button onClick={disableAOC} className="w-button admin_button">
                Disable AOC
            </button>
        </div>
    );
}
