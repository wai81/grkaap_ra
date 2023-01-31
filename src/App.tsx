import React from 'react';

import { Refine } from '@pankod/refine-core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-mui';

//import dataProvider from "@pankod/refine-simple-rest";
import { dataProvider } from './providers/data-provider/';
import routerProvider from '@pankod/refine-react-router-v6';
import { useTranslation } from 'react-i18next';
import { RefineKbarProvider } from '@pankod/refine-kbar';
import { Title, Sider, Layout, Header } from 'components/layout';
import { ColorModeContextProvider } from 'contexts';
import { OffLayoutArea } from 'components/offLayoutArea';
import { MuiInferencer } from '@pankod/refine-inferencer/mui';

import { API_URL } from './constants';

import { UserList, UserCreate, UserEdit, UserShow } from 'pages/users';

import {
  OrganizationList,
  OrganizationCreate,
  OrganizationEdit,
  OrganizationShow,
} from 'pages/organizations';

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <RefineKbarProvider>
          <Refine
            dataProvider={dataProvider(API_URL)}
            notificationProvider={notificationProvider}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            Title={Title}
            Sider={Sider}
            Layout={Layout}
            Header={Header}
            routerProvider={routerProvider}
            i18nProvider={i18nProvider}
            OffLayoutArea={OffLayoutArea}
            resources={[
              {
                name: 'users',
                list: UserList,
                create: UserCreate,
                edit: UserEdit,
                show: UserShow,
              },
              {
                name: 'organizations',
                list: OrganizationList,
                create: OrganizationCreate,
                edit: OrganizationEdit,
                show: OrganizationShow,
              },
            ]}
          />
        </RefineKbarProvider>
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
