import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  RegisterFormTypes,
  RegisterPageProps,
  BaseRecord,
  HttpError,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useRegister,
} from "@refinedev/core";
import { FormPropsType } from "../index";
import { layoutStyles, titleStyles } from "./styles";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  BoxProps,
  CardContentProps,
  Divider,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { Title } from "components/layout";

type RegisterProps = RegisterPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

/**
 * The register page will be used to register new users. You can use the following props for the <AuthPage> component when the type is "register".
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#register} for more details.
 */
export const RegisterPage: React.FC<RegisterProps> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  providers,
  formProps,
  title,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
    ...useFormProps,
  });
  
  const { mutate: registerMutate, isLoading } = useRegister<RegisterFormTypes>();
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
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "text.secondary",
                    borderColor: "text.secondary",
                    textTransform: "none",
                  }}
                  onClick={() =>
                    registerMutate({
                      providerName: provider.name,
                    })
                  }
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>
          <Divider sx={{ fontSize: 12, marginY: "16px" }}>
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
          {translate("pages.register.title", "Sign up for your account")}
        </Typography>
        {renderProviders()}
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return registerMutate(data);
          })}
        >
          <TextField
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translate(
                  "pages.register.errors.validEmail",
                  "Invalid email address"
                ),
              },
            })}
            id="email"
            margin="normal"
            fullWidth
            label={translate("pages.register.email", "Email")}
            error={!!errors.email}
            helperText={errors["email"] ? errors["email"].message : ""}
            name="email"
            autoComplete="email"
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
            label={translate("pages.register.fields.password", "Password")}
            helperText={errors["password"] ? errors["password"].message : ""}
            error={!!errors.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              mb: 0,
            }}
          />

          {loginLink ?? (
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              sx={{
                mt: "24px",
              }}
            >
              <Typography variant="body2" component="span" fontSize="12px">
                {translate(
                  "pages.login.buttons.haveAccount",
                  "Have an account?"
                )}
              </Typography>
              <MuiLink
                ml="4px"
                variant="body2"
                color="primary.light"
                component={ActiveLink}
                underline="none"
                to="/login"
                fontSize="12px"
                fontWeight="bold"
              >
                {translate("pages.login.signin", "Sign in")}
              </MuiLink>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: "24px",
            }}
          >
            {translate("pages.register.signup", "Sign up")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
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
        {renderContent ? (
          renderContent(Content, PageTitle)
        ) : (
          <>
            {PageTitle}
            {Content}
          </>
        )}
      </Container>
    </Box>
  );
};
