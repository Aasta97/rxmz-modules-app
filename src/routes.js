import React from "react";
import { Route, BrowserRouter, Navigate, Routes as Switch, Outlet } from "react-router-dom";
import { isAutheticate } from "./services/auth";

import Login from "./pages/Login";
import Initial from "./pages/Initial";
import FormReceipts from "./pages/formReceipts";
import ListReceipts from "./pages/listReceipts";

import FormProducts from "./pages/formProducts";
import ListProducts from "./pages/listProducts";

import FormUsers from "./pages/formUsers";
import ListUsers from "./pages/listUsers";

import FormClients from "./pages/formClients";
import ListClients from "./pages/listClients";

const PrivateRoute = () => {
    return isAutheticate() ? <Outlet /> : <Navigate to="/" />;
  };

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Login />} path="/" exact />       
        <Route element={<PrivateRoute />}>
          <Route element={<Initial />} path="/inicio" />
          <Route element={<FormUsers />} path="/usuarios/criar" exact />
          <Route element={<FormUsers />} path="/usuarios/editar/:id" exact />
          <Route element={<ListUsers />} path="/usuarios/listar" exact />
          <Route element={<FormClients />} path="/clientes/criar" exact />
          <Route element={<FormClients />} path="/clientes/editar/:id" exact />
          <Route element={<ListClients />} path="/clientes/listar" exact />
          <Route element={<FormProducts />} path="/produtos/criar" exact />
          <Route element={<FormProducts />} path="/produtos/editar/:id" exact />
          <Route element={<ListProducts />} path="/produtos/listar" exact />
          <Route element={<FormReceipts />} path="/recibos/criar" exact />
          <Route element={<FormReceipts />} path="/recibos/editar/:id" exact />
          <Route element={<ListReceipts />} path="/recibos/listar" exact />         
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
