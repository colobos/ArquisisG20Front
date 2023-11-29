import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Container } from "reactstrap";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from './viws/Home';
import Profile from './viws/Profile';

import PlayerProfile from "../src/viws/ViewPlayer/PlayerProfile"
import PredictionPlayer from "../src/viws/ViewPlayer/PredictionPlayer"
import NotFoundpage from './viws/NotFound/NotFoundpage';

import SearchStocks from './components/SearchStocks/SearchStocks';
import ParticularStock from './components/ParticularStock/ParticularStock';
import ParticularPrediction from './components/ParticularPrediction/ParticularPrediction';
import Billetera from './components/Billetera/Billetera';
import BuyAction from './components/BuyAction/BuyAction';
import AccionesDisponibles from './components/AccionesDisponibles/AccionesDisponibles';
import Subasta from './components/Subasta/Subasta';
import BuyActionAdmin from './components/BuyActionAdmin/BuyActionAdmin';
import BuyActionNormalUserAsAdmin from './components/BuyActionNormalUserAsAdmin/BuyActionNormalUserAsAdmin';
import BuyActionNormalUser from './components/BuyActionNormalUser/BuyActionNormalUser';
import SimulateStock from './components/SimulateStock/SimulateStock';
import ConfirmPurchase from './components/ConfirmPurchase/ConfirmPurchase';
import PurchaseCompleted from './components/PurchaseComplete/PurchaseComplete';

import { CookiesProvider, useCookies } from 'react-cookie';

//styles
import './App.css';

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import PetitionAction from './components/PetitionAction/PetitionAction';
import MyPetitions from './components/MyPetitions/MyPetitions';
;
initFontAwesome();

function App() {

  // const [cookies, setCookie] = useCookies(['user']);
  // function setCookieUser(user: any) {
  //   setCookie('user', user, { path: '/' });
  // }

  // console.log('cookies user:', cookies.user)


  return (
    <BrowserRouter>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/perfil" element={<PlayerProfile />} />

            <Route path="/predicciones_realizadas" element={<PredictionPlayer />} />

            <Route path="/peticiones" element={<PetitionAction />} />

            <Route path="/peticiones_ofertas_mias" element={<MyPetitions />} />

            <Route path={'/empresas_disponibles'} element={<SearchStocks />} />

            <Route path={'/acciones_disponibles'} element={<AccionesDisponibles />} />
            
            <Route path={"/empresas"} element={<ParticularStock />} />

            <Route path={"/prediccion"} element={<ParticularPrediction />} />

            <Route path={"/comprar"} element={<BuyAction />} />

            <Route path={"/comprar_admin"} element={<BuyActionAdmin />} />

            <Route path={"/comprar_admin_user_normal"} element={<BuyActionNormalUserAsAdmin />} />

            <Route path={"/comprar_user_normal"} element={<BuyActionNormalUser />} />

            <Route path={"/subasta"} element={<Subasta />} />

            <Route path={"/simular"} element={<SimulateStock />} />

            <Route path={"/billetera"} element={<Billetera />} />

            <Route path={"/confirmar-compra"} element={<ConfirmPurchase />} />
            
            <Route path={"/purchase-completed"} element={<PurchaseCompleted />} />


            <Route path="*" element={<NotFoundpage />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
