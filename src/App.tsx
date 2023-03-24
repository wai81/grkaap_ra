import React from "react";
import { Authenticated, Refine } from "@refinedev/core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { dataProvider } from "./providers/data-provider/";
//import routerProvider from '@refinedev/react-router-v6/legacy';
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { RefineKbarProvider } from "@refinedev/kbar";
import { ColorModeContextProvider } from "contexts";
import { OffLayoutArea } from "components/offLayoutArea";
//import {MuiInferencer} from '@pankod/refine-inferencer/mui';
import { API_URL, TOKEN_KEY } from "./constants";
import { UserList, UserCreate, UserEdit, UserShow } from "pages/users";
import {
  OrganizationList,
  OrganizationCreate,
  OrganizationEdit,
  OrganizationShow,
} from "pages/organizations";
import {
  SubunitsList,
  SubunitCreate,
  SubunitEdit,
  SubunitShow,
} from "pages/subunits";
import axios, { AxiosRequestConfig } from "axios";
import { authProvider } from "providers/auth-provider";
import { Login } from "pages/auth/login";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ClassTwoToneIcon from "@mui/icons-material/ClassTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import EmojiTransportationTwoToneIcon from "@mui/icons-material/EmojiTransportationTwoTone";
import AirportShuttleTwoToneIcon from "@mui/icons-material/AirportShuttleTwoTone";
import DriveEtaTwoToneIcon from "@mui/icons-material/DriveEtaTwoTone";
import { TransportList, TransportShow } from "pages/transports";

import {
  Booking_transportList as BookingTransportList,
  Booking_transportShow as BookingTransportShow,
} from "pages/booking_transports";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/ru";
import { Header, Layout, Sider, Title } from "components/layout";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return request;
});

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
          <RefineSnackbarProvider>
            <RefineKbarProvider>
              <Refine
                dataProvider={dataProvider(API_URL)}
                notificationProvider={notificationProvider}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                //Title={Title} //Заголовок бкового меню и кнопка свернуть меню
                //Sider={Sider} //Боковое меню
                //Layout={Layout} //Шаблон
                //Header={Header} //
                //legacyRouterProvider={routerProvider}
                routerProvider={routerProvider}
                i18nProvider={i18nProvider}
                legacyAuthProvider={authProvider(axiosInstance)}
                resources={[
                  {
                    name: "booking-transport",
                    meta: {
                        icon: <AirportShuttleTwoToneIcon />,
                      },
                  },
                  {
                    name: "booking_transport",
                    list: "/booking-transport/booking_transport",
                    show: "/booking-transport/booking_transport/show/:id",
                    
                    meta: {
                        icon: <EmojiTransportationTwoToneIcon />,
                        parent: "booking-transport",
                      },
  
                  },
                  {
                    name: "transports",
                    list: "/booking-transport/transports",
                    show: "/booking-transport/transports/show/:id",
                    
                    meta: {
                        icon: <DriveEtaTwoToneIcon />,
                        parent: "booking-transport",
                      },
  
                  },
                  {
                    name: "reference",
                    meta: {
                      icon: <ClassTwoToneIcon />,
                    },
                  },
                  {
                    name: "organizations",
                    list: "/reference/organizations",
                    create: "/reference/organizations/create",
                    edit: "/reference/organizations/edit/:id",
                    show: "/reference/organizations/show/:id",

                    meta: {
                      icon: <BusinessTwoToneIcon />,
                      parent: "reference",
                    },
                  },
                  {
                    name: "subunits",
                    list: "/reference/subunits",
                    create: "/reference/subunits/create",
                    edit: "/reference/subunits/edit/:id",
                    show: "/reference/subunits/show/:id",

                    meta: {
                      icon: <PeopleTwoToneIcon />,
                      parent: "reference",
                    },
                  },

                  {
                    name: "settings",
                    meta: {
                      icon: <SettingsTwoToneIcon />,
                    },
                  },
                  {
                    name: "users",
                    list: "/settings/users",
                    create: "/settings/users/create",
                    edit: "/settings/users/edit/:id",
                    show: "/settings/users/show/:id",
                    meta: {
                      icon: <AccountCircleTwoToneIcon />,
                      parent: "settings",
                    },
                  },
                ]}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <Layout
                          Header={Header}
                          Title={Title}
                          Sider={Sider}
                          OffLayoutArea={OffLayoutArea}
                        >
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    {/* маршрутизация на главную страницу(по умолчанию) поле аутенфикации */}
                    <Route
                      index
                      element={<NavigateToResource resource="users" />}
                    />

                    {/* маршрутизация для страниц в меню */}
                    <Route path="settings">
                      <Route path="users">
                        <Route index element={<UserList />} />
                        <Route path="create" element={<UserCreate />} />
                        <Route path="edit/:id" element={<UserEdit />} />
                        <Route path="show/:id" element={<UserShow />} />
                      </Route>
                    </Route>

                    <Route path="reference">
                      <Route path="organizations">
                        <Route index element={<OrganizationList />} />
                        <Route path="create" element={<OrganizationCreate />} />
                        <Route path="edit/:id" element={<OrganizationEdit />} />
                        <Route path="show/:id" element={<OrganizationShow />} />
                      </Route>
                      <Route path="subunits">
                        <Route index element={<SubunitsList />} />
                        <Route path="create" element={<SubunitCreate />} />
                        <Route path="edit/:id" element={<SubunitEdit />} />
                        <Route path="show/:id" element={<SubunitShow />} />
                      </Route>
                    </Route>

                    <Route path="booking-transport">
                        <Route path="booking_transport">
                            <Route index element={<BookingTransportList />} />
                            <Route path="show/:id" element={<BookingTransportShow />} />
                        </Route>
                        <Route path="transports">
                            <Route index element={<TransportList />} />
                            <Route path="show/:id" element={<TransportShow />} />
                        </Route>
                    </Route>
                  
                  </Route>


                  {/* маршрутизация для страницы логина   */}
                  <Route
                    element={
                      <Authenticated fallback={<Outlet />}>
                        <NavigateToResource resource="users" />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <Login />
                        //   <AuthPage
                        //     type="login"
                        //     formProps={{
                        //       defaultValues: {
                        //         email: "demo@refine.dev",
                        //         password: "demodemo",
                        //       },
                        //     }}
                        //   />
                      }
                    />
                  </Route>
                  {/* маршрутизация для страницы 404  */}
                  <Route
                    element={
                      <Authenticated>
                        <Layout
                          Header={Header}
                          Title={Title}
                          Sider={Sider}
                          OffLayoutArea={OffLayoutArea}
                        >
                          <Outlet />
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>
                <UnsavedChangesNotifier />
              </Refine>
            </RefineKbarProvider>
          </RefineSnackbarProvider>
        </LocalizationProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
