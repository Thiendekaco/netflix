import "./footer.styles.scss";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { useEffect, useState } from "react";

const Footer = ()=>{
    const [docs, setDocs] = useState([]);
    const getDataDocs = async() =>{
        setDocs((await getCategoriesAndDocuments("Footer")));
    }
    useEffect(()=>{
        getDataDocs();
    
    }, [])
   
    return(
        <div className="footer_page">
            {docs.map((doc, index) =>{
                return(
                    <div className="Footer_List" key={index}>
                        <li className="Footer_List_item">
                            <a href={doc.href}>{doc.title}</a>
                        </li>
                    </div>
                )
            })}
        <select name="Language" id="language">
                <option value="VietNam">Vietnamese</option>
                <option value="English">English</option>
        </select> 
        <p>Netflix Vietnam</p>   
        </div>
    )

}

export default Footer