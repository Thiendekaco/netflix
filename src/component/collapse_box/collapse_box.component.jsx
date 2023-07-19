import { useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "./collapse_box.styles.scss"


const Collapse_box = () =>{
    const [doc, setDoc] = useState([]);

    const getDataDocOfFireBase = async() =>{
        setDoc((await getCategoriesAndDocuments("Question")));
    }
    useEffect(()=>{
        getDataDocOfFireBase();
    
    }, [])
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
        
    const handleStyleOfContent = (questionOfBoxIsSelected, bool)=>{
           if(bool){
                questionOfBoxIsSelected.style.maxHeight = "" ;
                questionOfBoxIsSelected.style.padding = "0 50px";
           }else{
                questionOfBoxIsSelected.style.maxHeight = questionOfBoxIsSelected.scrollHeight+ 50 + "px" ;
                questionOfBoxIsSelected.style.padding = "25px 50px ";
           }
    }
    const handleOnClickExportContent = (e) =>{
       const itemBoxIsSelected = e.target;
       const allOfCollapsesBox = document.querySelectorAll("." + itemBoxIsSelected.className);
       if(allOfCollapsesBox){
        allOfCollapsesBox.forEach((tag) =>{
            if(tag.className === "Question active"){
                const questionOfCollapseBefore = tag.nextElementSibling;
                tag.classList.remove('active')
                handleStyleOfContent(questionOfCollapseBefore, true);
            }
        })
       }
       itemBoxIsSelected.classList.toggle('active');
       const questionOfCollapseAfter = itemBoxIsSelected.nextElementSibling;
       handleStyleOfContent( questionOfCollapseAfter,questionOfCollapseAfter.style.maxHeight !=="")
    
        
    }
    return(
   
        <div className="collapse_box">
            {doc.map(({title, ans}, index) => {
                return(
                    <span key={index}>
                        <button className="Question" onClick={(e) =>handleOnClickExportContent(e)} >
                            {title}
                        </button>
                        <div className = "contentAnswer">
                            {ans}
                        </div>
                    </span>
                )
            })}
            

            <h3>Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách thành viên của bạn.</h3>
            < form className ="form-floating" onSubmit={handleSubmit} >
            <input type="email" name="email" className='form-control' placeholder = "Enter your email" required autoFocus/>
            <label htmlFor="email">Địa chỉ email</label>
            <button className='btn btn-danger'>Bắt Đầu {<FontAwesomeIcon icon={faArrowRight} />} </button>
            </form>
        </div>
      
       
    )
}


export default Collapse_box
