import React from 'react';
import {Refine} from '@pankod/refine-core';
import {
    notificationProvider,
    RefineSnackbarProvider,
    CssBaseline,
    GlobalStyles,
    ReadyPage,
    ErrorComponent,
} from '@pankod/refine-mui';
import {dataProvider} from './providers/data-provider/';
import routerProvider from '@pankod/refine-react-router-v6';
import {useTranslation} from 'react-i18next';
import {RefineKbarProvider} from '@pankod/refine-kbar';
import {Title, Sider, Layout, Header} from 'components/layout';
import {ColorModeContextProvider} from 'contexts';
import {OffLayoutArea} from 'components/offLayoutArea';
import {MuiInferencer} from '@pankod/refine-inferencer/mui';
import {API_URL, TOKEN_KEY} from './constants';
import {UserList, UserCreate, UserEdit, UserShow} from 'pages/users';
import {
    OrganizationList,
    OrganizationCreate,
    OrganizationEdit,
    OrganizationShow,
} from 'pages/organizations';
import {
    SubunitsList,
    SubunitCreate,
    SubunitEdit,
    SubunitShow
} from "pages/subunits";
import axios, {AxiosRequestConfig} from 'axios';
import {authProvider} from 'providers/auth-provider';
import {Login} from 'pages/auth/login';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import ClassTwoToneIcon from '@mui/icons-material/ClassTwoTone';
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone';
import EmojiTransportationTwoToneIcon from '@mui/icons-material/EmojiTransportationTwoTone';
import AirportShuttleTwoToneIcon from '@mui/icons-material/AirportShuttleTwoTone';
import DriveEtaTwoToneIcon from '@mui/icons-material/DriveEtaTwoTone';

import { TransportList, TransportCreate, TransportEdit, TransportShow } from "pages/transports";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        if (request.headers) {
            request.headers['Authorization'] = `Bearer ${token}`;
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
        <ColorModeContextProvider>
            <CssBaseline/>
            <GlobalStyles styles={{html: {WebkitFontSmoothing: 'auto'}}}/>
            <RefineSnackbarProvider>
                <RefineKbarProvider>
                    <Refine
                        dataProvider={dataProvider(API_URL)}
                        notificationProvider={notificationProvider}
                        ReadyPage={ReadyPage}
                        catchAll={<ErrorComponent/>}
                        Title={Title} //Заголовок бкового меню и кнопка свернуть меню
                        Sider={Sider} //Боковое меню
                        Layout={Layout} //Шаблон
                        Header={Header} //
                        routerProvider={routerProvider}
                        i18nProvider={i18nProvider}
                        OffLayoutArea={OffLayoutArea}
                        authProvider={authProvider(axiosInstance)}
                        LoginPage={() => (
                            <Login/>
                        )}
                        resources={[{
                            name: 'bookingTransport',
                            icon: <AirportShuttleTwoToneIcon/>
                        }, // {
                        //   name: 'booking_transport',
                        //   parentName: 'bookingTransport',
                        //   list: OrganizationList,
                        //   create: OrganizationCreate,
                        //   edit: OrganizationEdit,
                        //   show: OrganizationShow,
                        //   icon: <EmojiTransportationTwoToneIcon/>
                        //
                        // },
                        // {
                        //       name: 'transport',
                        //       parentName: 'bookingTransport',
                        //       list: OrganizationList,
                        //       create: OrganizationCreate,
                        //       edit: OrganizationEdit,
                        //       show: OrganizationShow,
                        //       icon: <DriveEtaTwoToneIcon/>
                        //
                        //   },
                        {
                            name: 'reference',
                            icon: <ClassTwoToneIcon/>
                        }, {
                                name: 'organizations',
                                parentName: 'reference',
                                list: OrganizationList,
                                create: OrganizationCreate,
                                edit: OrganizationEdit,
                                show: OrganizationShow,
                                icon: <BusinessTwoToneIcon/>
                            }, {
                                name: 'subunits',
                                parentName: 'reference',
                                list: SubunitsList,
                                create: SubunitCreate,
                                edit: SubunitEdit,
                                show: SubunitShow,
                                icon: <PeopleTwoToneIcon/>
                            }, {
                            name: 'settings',
                            icon: <SettingsTwoToneIcon/>
                        }, {
                                name: 'users',
                                parentName: 'settings',
                                list: UserList,
                                create: UserCreate,
                                edit: UserEdit,
                                show: UserShow,
                                icon: <AccountCircleTwoToneIcon/>,
                            }, {
                            name: "transport",
                            list: TransportList,
                            create: TransportCreate,
                            edit: TransportEdit,
                            show: TransportShow
                        }]}
                    />
                </RefineKbarProvider>
            </RefineSnackbarProvider>
        </ColorModeContextProvider>
    );
}

export default App;
