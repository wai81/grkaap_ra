import { HttpError, useLogin, useTranslate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from "react-hook-form";
import React from "react";
import {layoutStyles, titleStyles} from "./styles";
import { Box, Button, Card, CardContent, Container, TextField, Typography } from "@mui/material";

export interface ILoginForm {
    username: string;
    password: string;
}

export const Login: React.FC = () => {
    const methods = useForm<ILoginForm, HttpError, ILoginForm>();
    const {mutate: login, isLoading} = useLogin<ILoginForm>({
        v3LegacyAuthProviderCompatible: true
    });
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = methods;
    const t = useTranslate();
    return (
        <FormProvider {...methods}>
            <Box component="div" style={layoutStyles}>
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100vh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Card>
                            <CardContent sx={{paddingX: '32px'}}>
                                <Typography
                                    component="h1"
                                    variant="h5"
                                    align="center"
                                    style={titleStyles}
                                    color="primary"
                                >
                                    {t('pages.login.title', 'Sign in to your account')}
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit((data) => {
                                        // if (onSubmit) {
                                        //     return onSubmit(data);
                                        // }
                                        return login(data);
                                    })}
                                    gap="16px"
                                >
                                    <TextField
                                        {...register('username', {
                                            required: true,
                                        })}
                                        id="username"
                                        margin="normal"
                                        fullWidth
                                        label={t('pages.login.fields.username', 'Username')}
                                        error={!!errors.username}
                                        name="username"
                                        placeholder="i.ivanov"
                                        type="text"
                                        autoComplete="username"
                                    />
                                    <TextField
                                        {...register('password', {
                                            required: true,
                                        })}
                                        id="password"
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label={t('pages.login.fields.password', 'Password')}
                                        helperText={errors?.password?.message}
                                        error={!!errors.password}
                                        type="password"
                                        placeholder="●●●●●●●●"
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: '8px',
                                        }}
                                        disabled={isLoading}
                                    >
                                        {t('pages.login.signin', 'Sign in')}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </FormProvider>
    )
}