import React from "react";
import {Authenticated, CanAccess, Refine} from "@refinedev/core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    ErrorComponent,
} from "@refinedev/mui";
import {CssBaseline, GlobalStyles} from "@mui/material";
import {dataProvider} from "./providers/data-provider/";
import routerBindings, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import {useTranslation} from "react-i18next";
import {RefineKbarProvider} from "@refinedev/kbar";
import {ColorModeContextProvider} from "./contexts/color-mode";
import {OffLayoutArea} from "components/offLayoutArea";
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';

import {API_URL, TOKEN_KEY} from "./constants";
import {UserList, UserCreate, UserEdit, UserShow} from "pages/users";
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
import axios, {AxiosRequestConfig} from "axios";
import {authProvider} from "providers/auth-provider";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ClassTwoToneIcon from "@mui/icons-material/ClassTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import EmojiTransportationTwoToneIcon from "@mui/icons-material/EmojiTransportationTwoTone";
import AirportShuttleTwoToneIcon from "@mui/icons-material/AirportShuttleTwoTone";
import DriveEtaTwoToneIcon from "@mui/icons-material/DriveEtaTwoTone";
import {TransportList} from "pages/transports";

import {
    Booking_transportList as BookingTransportList,
} from "pages/booking_transports";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/ru";
import {Header, Layout, Sider, Title} from "components/layout";
import {AuthPage} from "pages/auth";
import {DashboardBookingTransport} from "./pages/booking_transports/dasboard";
import { RoleList } from "pages/roles";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import {CasbinObjectsList} from "pages/casbinobjects";
import {accessControlProvider, IAccessControlContext} from "./providers/accessControl-provider";

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
    const {t, i18n} = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <BrowserRouter>
            <ColorModeContextProvider>
                <CssBaseline/>
                <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
                    <RefineSnackbarProvider>
                        <RefineKbarProvider>
                            <Refine
                                dataProvider={dataProvider(API_URL, axiosInstance)}
                                notificationProvider={notificationProvider}
                                routerProvider={routerBindings}
                                i18nProvider={i18nProvider}
                                authProvider={authProvider(axiosInstance)}
                                accessControlProvider={{
                                    can: async ({ action, params, resource }) => {
                                        const token = localStorage.getItem(TOKEN_KEY);
                                        const result: any = await axios.get<{ url: string }>(
                                            `${API_URL}/users/can/?resource=${resource}&action=${action}`,
                                            {
                                                withCredentials: false,
                                                headers: {
                                                    "Access-Control-Allow-Origin": "*",
                                                    "Authorization": `Bearer ${token}`,
                                                },
                                            }
                                        );
                                        return {
                                            can: result.data
                                        }
                                    }
                                }}
                                options={{
                                    syncWithLocation: true,
                                    //warnWhenUnsavedChanges: true,
                                    liveMode: "auto",
                                    // reactQuery:{
                                    //     devtoolConfig:false, // отключение среды разработчика
                                    // }
                                    //mutationMode: "undoable",
                                    //undoableTimeout: 3500
                                }}

                                resources={[{
                                    name: "booking-transport",
                                    meta: {
                                        icon: <AirportShuttleTwoToneIcon/>,
                                    },
                                }, {
                                    name: "dashboard_transport",
                                    list: "/booking-transport/dashboard_transport",
                                    //show: "/booking-transport/booking_transport/show/:id",

                                    meta: {
                                        icon: <EmojiTransportationTwoToneIcon/>,
                                        parent: "booking-transport",
                                    },
                                }, {
                                    name: "booking_transport",
                                    list: "/booking-transport/booking_transport",
                                    show: "/booking-transport/booking_transport/show/:id",

                                    meta: {
                                        icon: <LibraryBooksTwoToneIcon/>,
                                        parent: "booking-transport",
                                    },

                                }, {
                                    name: "transports",
                                    list: "/booking-transport/transports",
                                    show: "/booking-transport/transports/show/:id",

                                    meta: {
                                        icon: <DriveEtaTwoToneIcon/>,
                                        parent: "booking-transport",
                                    },

                                }, {
                                    name: "reference",
                                    meta: {
                                        icon: <ClassTwoToneIcon/>,
                                    },
                                }, {
                                    name: "organizations",
                                    list: "/reference/organizations",
                                    create: "/reference/organizations/create",
                                    edit: "/reference/organizations/edit/:id",
                                    show: "/reference/organizations/show/:id",

                                    meta: {
                                        icon: <BusinessTwoToneIcon/>,
                                        parent: "reference",
                                    },
                                }, {
                                    name: "subunits",
                                    list: "/reference/subunits",
                                    create: "/reference/subunits/create",
                                    edit: "/reference/subunits/edit/:id",
                                    show: "/reference/subunits/show/:id",

                                    meta: {
                                        icon: <PeopleTwoToneIcon/>,
                                        parent: "reference",
                                    },
                                }, {
                                    name: "settings",
                                    meta: {
                                        icon: <SettingsTwoToneIcon/>,
                                    },
                                }, {
                                    name: "users",
                                    list: "/settings/users",
                                    create: "/settings/users/create",
                                    edit: "/settings/users/edit/:id",
                                    show: "/settings/users/show/:id",
                                    meta: {
                                        icon: <AccountCircleTwoToneIcon/>,
                                        parent: "settings",
                                    },
                                }, {
                                    name: "admin/roles",
                                    list: "/settings/roles",
                                    create: "/settings/roles/create",
                                    edit: "/settings/roles/edit/:id",
                                    show: "/settings/roles/show/:id",
                                    meta: {
                                        icon: <AccountCircleTwoToneIcon/>,
                                        parent: "settings",
                                    },
                                }, {
                                    
                                    name: "admin/objects",

                                    list: "/settings/casbinObjects",
                                    create: "/settings/casbinObjects/create",
                                    edit: "/settings/casbinObjects/edit/:id",
                                    show: "/settings/casbinObjects/show/:id",
                                    meta: {
                                        icon: <AccountCircleTwoToneIcon/>,
                                        parent: "settings",
                                    },
                                }]}
                            >
                                <Routes>
                                    {/* маршрутизация для страницы логина   */}
                                    <Route
                                        element={
                                            <Authenticated fallback={<Outlet/>}>
                                                <NavigateToResource />
                                            </Authenticated>
                                        }
                                    >
                                        <Route
                                            path="/login"
                                            element={<AuthPage type="login" />}
                                        />
                                    </Route>
                                    <Route
                                        element={
                                            <Authenticated redirectOnFail={"/login"}
                                            >
                                                <Layout
                                                    Header={Header}
                                                    Title={Title}
                                                    Sider={Sider}
                                                    OffLayoutArea={OffLayoutArea}
                                                >
                                                    <CanAccess
                                                        fallback={<div>Unauthorized!</div>}>
                                                        <Outlet/>
                                                    </CanAccess>
                                                </Layout>
                                            </Authenticated>
                                        }
                                    >
                                        {/* маршрутизация на главную страницу(по умолчанию) поле аутенфикации */}
                                        <Route
                                            index
                                            element={<NavigateToResource resource="dashboard_transport"/>}
                                        />
                                        {/* маршрутизация для страниц в меню */}
                                        <Route path="settings">
                                            <Route path="users">
                                                <Route index element={<UserList/>}/>
                                                <Route path="create" element={<UserCreate/>}/>
                                                <Route path="edit/:id" element={<UserEdit/>}/>
                                                <Route path="show/:id" element={<UserShow/>}/>
                                            </Route>
                                            <Route path="roles" >
                                                <Route index element={<RoleList />}/>
                                            </Route>
                                            <Route path="casbinObjects" >
                                                <Route index element={<CasbinObjectsList />}/>
                                            </Route>
                                        </Route>

                                        <Route path="reference">
                                            <Route path="organizations">
                                                <Route index element={<OrganizationList/>}/>
                                                <Route path="create" element={<OrganizationCreate/>}/>
                                                <Route path="edit/:id" element={<OrganizationEdit/>}/>
                                                <Route path="show/:id" element={<OrganizationShow/>}/>
                                            </Route>
                                            <Route path="subunits">
                                                <Route index element={<SubunitsList/>}/>
                                                <Route path="create" element={<SubunitCreate/>}/>
                                                <Route path="edit/:id" element={<SubunitEdit/>}/>
                                                <Route path="show/:id" element={<SubunitShow/>}/>
                                            </Route>
                                        </Route>

                                        <Route path="booking-transport">
                                            <Route path="dashboard_transport">
                                                <Route index element={<DashboardBookingTransport/>}/>
                                            </Route>
                                            <Route path="booking_transport">
                                                <Route index element={<BookingTransportList/>}/>
                                            </Route>
                                            <Route path="transports">
                                                <Route index element={<TransportList/>}/>
                                            </Route>
                                        </Route>

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
                                                    <Outlet/>
                                                </Layout>
                                            </Authenticated>
                                        }
                                    >
                                        <Route path="*" element={<ErrorComponent/>}/>
                                    </Route>
                                </Routes>
                                <UnsavedChangesNotifier/>
                            </Refine>
                        </RefineKbarProvider>
                    </RefineSnackbarProvider>
                </LocalizationProvider>
            </ColorModeContextProvider>
        </BrowserRouter>
    );
}

export default App;
