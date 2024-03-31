import hero_img from "../assets/hero_img.jpg";
import deliveryform from "../assets/delivery_form.jpg";
import SearchBar, {SearchForm} from "@/components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate ({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Agiza your favourite food today 
                </h1>
                <span className="text-xl"> Food is just a click away! </span>
                <SearchBar placeHolder=" Search by City or Town" onSubmit={handleSearchSubmit}/>
            </div>
            <div className="grid md:grid-col-2 gap-5">
                <img src={hero_img} />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 text-center ">
                <span className="font-bold text-3xl tracking-tighter">
                    Order takeaway even faster!
                </span>
                <span>
                    ChakulaExpress App for faster ordering and personalized restaurant recommendations
                </span>
                    <img src={deliveryform} />
            </div>

        </div>
    );
};


export default HomePage;












