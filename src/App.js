import React from 'react';
import logo from './logo.svg';
import Toolbar from './layout/toolbar'
import Footer from './layout/footer'
import Burger from './layout/burger'
import Home from './pages/home'
import ProductDetails from './pages/productDetails'
import ServiceDetails from './pages/serviceDetails'
import ChatPage from './pages/chatPage';
import SearchPage from './pages/searchPage'
import Messages from './pages/messages';
import NotFound from './pages/404';
import VendorHome from './pages/vendor/login';
import AdminHome from './pages/admin/adminHome';
import AdminRequests from './pages/admin/adminRequests';
import CreateService from './pages/vendor/createService';
import CreateProduct from './pages/vendor/createProduct';
import CreateRequest from './pages/vendor/createRequest';
import MyServices from './pages/vendor/services';
import MyProducts from './pages/vendor/products';
// import CreateProduct from './pages/vendor/createProduct';
import './App.css';
import './styles/productCard.css';
import GlobalState from './context/globalState'
import { Switch, Route } from 'react-router'


function App() {
  return (
    <GlobalState>
      {
        window.location.href.includes("vendor") ? <div>
          <Toolbar vendor={true} />
          <div style={{ display: document.documentElement.clientWidth < "768" ? "" : "none" }}>
            <Burger vendor={true} />
          </div>
          <div className="toolbar-filler"></div> {/* filler for fixed toolbar */}
          <Switch>
            <Route path="/vendor/create-a-service" component={CreateService} />
            <Route path="/vendor/create-a-product" component={CreateProduct} />
            <Route path="/vendor/create-a-request" component={CreateRequest} />
            <Route path="/vendor/my-messages" component={Messages} />
            <Route path="/vendor/my-services" component={MyServices} />
            <Route path="/vendor/my-products" component={MyProducts} />
            <Route path="/vendor" component={VendorHome} />
          </Switch>
          <Footer />
        </div> : window.location.href.includes("superadmin") ?
            <div>
              <Toolbar admin={true} />
              <div style={{ display: document.documentElement.clientWidth < "768" ? "" : "none" }}>
                <Burger superadmin={true} />
              </div>
              <div className="toolbar-filler"></div>
              <Switch>


                <Route path="/superadmin/my-requests" component={AdminRequests} />
                <Route path="/superadmin" component={AdminHome} />
              </Switch>
              <Footer /> </div> :
            <div className="App">
              <Toolbar />
              <Burger />
              <div className="toolbar-filler"></div> {/* filler for fixed toolbar */}
              <header className="App-header">
                <Switch>
                  <Route path="/search/:query" component={SearchPage} />
                  <Route path="/product/:id" component={ProductDetails} />
                  <Route path="/service/:id" component={ServiceDetails} />
                  <Route path="/chat/:id" component={ChatPage} />
                  <Route path="/messages" component={Messages} />
                  <Route path="/search/" component={NotFound} />
                  <Route exact path="/" component={Home} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </header>
              <Footer />

            </div>
      }

    </GlobalState>
  );
}

export default App;
