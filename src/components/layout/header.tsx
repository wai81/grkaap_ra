import React, {useContext} from "react";
import {useGetIdentity, useActiveAuthProvider, useGetLocale, useSetLocale} from "@refinedev/core";
import {AppBar, Stack, Toolbar, Typography, Avatar, IconButton, FormControl, Select, MenuItem} from "@mui/material";
import type { RefineLayoutHeaderProps } from "@refinedev/mui";
import {DarkModeOutlined, LightModeOutlined} from "@mui/icons-material";
import {ColorModeContext} from "../../contexts";
import i18n from "../../i18n";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.name || user.avatar);

  return shouldRenderHeader ? (
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
            <Typography variant="subtitle2">{user?.name}</Typography>
            <Avatar src={user?.avatar} alt={user?.name} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
