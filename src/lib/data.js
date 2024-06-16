
import { AiOutlineDownload } from "react-icons/ai";
import { viewApplication , downloadFile } from "../services/operation/common";

export const downloadData = {
    downloadData: [
        {
            name: "Application",
            function: (applicationID) => viewApplication(applicationID),
        },
        {
            name: "Fees",
            function: (applicationID) => downloadFile(applicationID , "regFeesProof"),
        },
        {
            name: "Confeerence",
            function: (applicationID) => downloadFile(applicationID , "conferenceAcceptance"),
        },
        {
            name: "Indexing Proof",
            function: (applicationID) => downloadFile(applicationID , "indexingProof"),
        }
    ],
    downloadIcon : <AiOutlineDownload onClick={() => console.log("Hey")} className="icon iconMedium" />,
}