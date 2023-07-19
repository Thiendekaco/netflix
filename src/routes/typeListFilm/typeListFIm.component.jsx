import "./typeListFilm.styles.scss"
import {Routes, Route} from 'react-router-dom';
import TypeFilm from "../typeFIlm/typeFilm.component";

const TypeListFIlms = () =>{
    return(
        <Routes>
            <Route path=":typeFilm" element = {<TypeFilm />} />
        </Routes>
    )

}

export default TypeListFIlms;