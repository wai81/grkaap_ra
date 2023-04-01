import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import { FormProvider } from "react-hook-form";
import {
  LoginPageProps,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useLogin,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
} from "@refinedev/core";
import { FormPropsType } from "../index";
import { layoutStyles, titleStyles } from "./styles";
import {
  Button,
  BoxProps,
  Box,
  Checkbox,
  Container,
  Card,
  CardContent,
  CardContentProps,
  FormControlLabel,
  TextField,
  Typography,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Title } from "components/layout";

type LoginProps = LoginPageProps<BoxProps, CardContentProps, FormPropsType>;

export interface ILoginForm {
  username?: string;
  password?: string;
  remember?: boolean;
  providerName?: string;
  redirectPath?: string;
}

/**
 * login will be used as the default type of the <AuthPage> component. The login page will be used to log in to the system.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const methods = useForm<BaseRecord, HttpError, ILoginForm>({
    ...useFormProps,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const authProvider = useActiveAuthProvider();
  console.log('auth login '+Boolean(authProvider?.isLegacy))
  const { mutate: login, isLoading } = useLogin<ILoginForm>(
    //{v3LegacyAuthProviderCompatible: false//Boolean(authProvider?.isLegacy),}
 );
  console.log('login '+login)
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? <Title collapsed={false} />}
      </div>
    );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "text.secondary",
                    borderColor: "text.secondary",
                    textTransform: "none",
                  }}
                  onClick={() => login({ providerName: provider.name })}
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          <Divider
            sx={{
              fontSize: "12px",
              marginY: "16px",
            }}
          >
            {translate("pages.login.divider", "or")}
          </Divider>
        </>
      );
    }
    return null;
  };

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary.dark"
          fontWeight={700}
        >
          {translate("pages.login.title", "Sign in to your account")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return login(data);
          })}
        >
          {renderProviders()}
          <TextField
            {...register("username", {
              required: true,
            })}
            id="username"
            margin="normal"
            fullWidth
            label={translate("pages.login.fields.username", "Username")}
            error={!!errors.username}
            name="username"
            type="text"
            autoComplete="username"
            sx={{
              mt: 0,
            }}
          />
          <TextField
            {...register("password", {
              required: true,
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate("pages.login.fields.password", "Password")}
            helperText={errors?.password?.message}
            error={!!errors.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              mb: 0,
            }}
          />

          <Box
            component="div"
            sx={{
              mt: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {rememberMe ?? (
              <FormControlLabel
                sx={{
                  span: {
                    fontSize: "14px",
                    color: "text.secondary",
                  },
                }}
                color="secondary"
                control={
                  <Checkbox
                    size="small"
                    id="remember"
                    {...register("remember")}
                  />
                }
                label={translate(
                  "pages.login.buttons.rememberMe",
                  "Remember me"
                )}
              />
            )}
            {/* {forgotPasswordLink ?? (
              <MuiLink
                variant="body2"
                color="primary.light"
                fontSize="12px"
                component={ActiveLink}
                underline="none"
                to="/forgot-password"
              >
                {translate(
                  "pages.login.buttons.forgotPassword",
                  "Forgot password?"
                )}
              </MuiLink>
            )} */}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: "24px" }}
          >
            {translate("pages.login.signin", "Sign in")}
          </Button>
          {registerLink ?? (
            <Box sx={{ mt: "24px" }}>
              <Typography variant="body2" component="span" fontSize="12px">
                {translate(
                  "pages.login.buttons.noAccount",
                  "Don’t have an account?"
                )}
              </Typography>
              <MuiLink
                ml="4px"
                fontSize="12px"
                variant="body2"
                color="primary.light"
                component={ActiveLink}
                underline="none"
                to="/register"
                fontWeight="bold"
              >
                {translate("pages.login.signup", "Sign up")}
              </MuiLink>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <FormProvider {...methods}>
      <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {renderContent ? (
              renderContent(Content, PageTitle)
            ) : (
              <>
                {PageTitle}
                {Content}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </FormProvider>
  );
};
