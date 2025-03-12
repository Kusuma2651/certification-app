import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CertificationForm from "./components/CertificationForm";
import CertificationList from "./components/CertificationList";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<CertificationForm />} />
                    <Route path="/list" element={<CertificationList />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
