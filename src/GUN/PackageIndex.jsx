import PackageHead from "./components/PackageHead";
import PackageBody from "./components/PackageBody";
import PackageFoot from "./components/PackageFoot";
import Navbar from "../CKH/Components/Navbar/Navbar";


function App(){
    return(
        <div>
            <Navbar />
            <PackageHead></PackageHead>
            <PackageBody></PackageBody>
            <PackageFoot></PackageFoot>
        </div>
    );    
}
export default App ;
