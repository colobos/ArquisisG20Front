import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Container } from "reactstrap";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from './viws/Home';
import Profile from './viws/Profile';

import PlayerProfile from "../src/viws/ViewPlayer/PlayerProfile"
import NotFoundpage from './viws/NotFound/NotFoundpage';

import SearchStocks from './components/SearchStocks/SearchStocks';
import ParticularStock from './components/ParticularStock/ParticularStock';
import Billetera from './components/Billetera/Billetera';
import BuyAction from './components/BuyAction/BuyAction';
import ConfirmPurchase from './components/ConfirmPurchase/ConfirmPurchase';
import PurchaseCompleted from './components/PurchaseComplete/PurchaseComplete';

import { CookiesProvider, useCookies } from 'react-cookie';

//styles
import './App.css';

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
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

            <Route path={'/empresas_disponibles'} element={<SearchStocks />} />

            <Route path={"/empresas"} element={<ParticularStock />} />

            <Route path={"/comprar"} element={<BuyAction />} />
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
