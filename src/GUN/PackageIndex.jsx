import PackageHead from "./components/PackageHead";

import PackageFoot from "./components/PackageFoot";
import Navbar from "../CKH/Components/Navbar/Navbar";


function App(){
    return(
        <div>
            <Navbar />
            <PackageHead></PackageHead>
   
            <PackageFoot></PackageFoot>
        </div>
    );    
}
export default App ;
