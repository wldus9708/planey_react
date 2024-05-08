import ProductPage from "./productDitail";
import { Route } from "react-router-dom";
function App(){
    return(
        <div className="max-w-7xl mx-auto p-8">
           
        <Route path='/dd' component={ProductPage} />
        </div>
         
    )
}