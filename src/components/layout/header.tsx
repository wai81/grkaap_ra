import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {useGetIdentity, useActiveAuthProvider, useGetLocale, useSetLocale} from "@refinedev/core";
import i18n from "../../i18n";
import React, {useContext} from "react";
import {ColorModeContext} from "../../contexts/color-mode";
import { IUser } from "interfaces/IUser";


export const Header: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();
  //const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity<IUser>(
    //{v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),}
  );
  console.log('header user '+ user)
  return  (
    <AppBar color="default" position="sticky" elevation={1}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton
              onClick={() => {
                setMode();
              }}
          >
            {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
                disableUnderline
                defaultValue={currentLocale}
                inputProps={{ 'aria-label': 'Without label' }}
                variant="standard"
            >
              {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                  <MenuItem
                      selected={currentLocale === lang}
                      key={lang}
                      defaultValue={lang}
                      onClick={() => {
                        changeLanguage(lang);
                      }}
                      value={lang}
                  >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                      <Avatar
                          sx={{
                            width: '16px',
                            height: '16px',
                            marginRight: '5px',
                          }}
                          src={`/images/flags/${lang}.svg`}
                      />
                      {lang === 'en'
                          ? 'English'
                          : lang === 'de'
                              ? 'German'
                              : 'Русский'}
                    </Stack>
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle2">{user?.last_name} {user?.first_name}</Typography>
            {user?.avatar == null ?
                <Avatar src={user?.last_name} alt={user?.last_name} />
                :<Avatar src={user?.avatar} alt={user?.last_name} />
            } 
            {/* <Avatar src={user?.avatar} alt={user?.last_name} /> */}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
