import { HttpError } from '@pankod/refine-core/dist/interfaces';
import {
  Create,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  useAutocomplete,
} from '@pankod/refine-mui';
import {
  useForm,
  Controller,
  SubmitHandler,
} from '@pankod/refine-react-hook-form';
import { IOrganization } from 'interfaces/IOrganization';
import { ICreateUser } from 'interfaces/IUser';
import { useState } from 'react';

export interface ICreateForm {
  username: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  password: string;
  organization: IOrganization;
}
export const UserCreate = () => {
  const {
    refineCore: { formLoading, onFinish },
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: organizationAutocompleteProps } =
    useAutocomplete<IOrganization>({
      resource: 'organizations',
      sort: [{ field: 'id', order: 'asc' }],
    });

  const handleOnSubmit = (data: any) => {
    const user: ICreateUser = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      patronymic: data.patronymic,
      password: data.password,
      organization_id: data.organization.id,
    };
    onFinish(user);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Create
        isLoading={formLoading}
        saveButtonProps={{
          //variant: 'outlined',
          //size: 'small',
          type: 'submit',
        }}
      >
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column' }}
          autoComplete="off"
        >
          <TextField
            {...register('username', {
              required: 'This field is required',
            })}
            error={!!(errors as any)?.username}
            helperText={(errors as any)?.username?.message}
            margin="normal"
            fullWidth
            type="text"
            label="Username"
            name="username"
          />
          <TextField
            {...register('first_name')}
            margin="normal"
            type="text"
            label="First name"
          />
          <TextField
            {...register('last_name')}
            margin="normal"
            type="text"
            label="Last name"
          />
          <TextField
            {...register('patronymic')}
            margin="normal"
            type="text"
            label="Patronymic"
          />
          <Controller
            control={control}
            name="organization"
            rules={{ required: 'This field is required' }}
            // eslint-disable-next-line
            defaultValue={null as any}
            render={({ field }) => (
              <Autocomplete
                {...organizationAutocompleteProps}
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                getOptionLabel={(item) => {
                  //console.log(item);
                  return (
                    organizationAutocompleteProps?.options?.find(
                      (p) => p.id === item.id
                    )?.name ?? ''
                  );
                }}
                isOptionEqualToValue={(option, value) => {
                  // console.log(value.id);
                  // console.log(option);
                  //return option.id === value.id;
                  return option.id === value.id;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Organization"
                    margin="normal"
                    variant="outlined"
                    error={!!(errors as any)?.organization?.id}
                    helperText={(errors as any)?.organization?.id?.message}
                    required
                  />
                )}
              />
            )}
          />
          <TextField
            {...register('password')}
            margin="normal"
            type="password"
            label="Password"
          />
          {/* <button type="submit" disabled={formLoading}>
          {formLoading && <div>Loading...</div>}
          <span>Save</span>
        </button> */}
        </Box>
      </Create>
    </form>
    // <Create
    //   isLoading={formLoading}
    //   saveButtonProps={saveButtonProps}
    //   //saveButtonProps={handleSubmit(handleSubmitCreate)}
    // >
    //   <Box
    //     component="form"
    //     sx={{ display: 'flex', flexDirection: 'column' }}
    //     autoComplete="off"
    //   >
    //     <form onSubmit={handleSubmit(handleOnSubmit)}>
    //       <TextField
    //         {...register('username', {
    //           required: 'This field is required',
    //         })}
    //         error={!!(errors as any)?.username}
    //         helperText={(errors as any)?.username?.message}
    //         margin="normal"
    //         fullWidth
    //         InputLabelProps={{ shrink: true }}
    //         type="text"
    //         label="Username"
    //         name="username"
    //       />
    //       <TextField
    //         {...register('last_name', {
    //           required: 'This field is required',
    //         })}
    //         error={!!(errors as any)?.last_name}
    //         helperText={(errors as any)?.last_name?.message}
    //         margin="normal"
    //         fullWidth
    //         InputLabelProps={{ shrink: true }}
    //         type="text"
    //         label="Last Name"
    //         name="last_name"
    //       />
    //       <TextField
    //         {...register('first_name', {
    //           required: 'This field is required',
    //         })}
    //         error={!!(errors as any)?.first_name}
    //         helperText={(errors as any)?.first_name?.message}
    //         margin="normal"
    //         fullWidth
    //         InputLabelProps={{ shrink: true }}
    //         type="text"
    //         label="First Name"
    //         name="first_name"
    //       />
    //       <TextField
    //         {...register('patronymic', {
    //           required: 'This field is required',
    //         })}
    //         error={!!(errors as any)?.patronymic}
    //         helperText={(errors as any)?.patronymic?.message}
    //         margin="normal"
    //         fullWidth
    //         InputLabelProps={{ shrink: true }}
    //         type="text"
    //         label="Patronymic"
    //         name="patronymic"
    //       />

    //       {/* <Controller
    //       control={control}
    //       name="is_active"
    //       // eslint-disable-next-line
    //       defaultValue={true}
    //       render={({ field }) => (
    //         <FormControlLabel
    //           label="Is Active"
    //           control={
    //             <Checkbox
    //               {...field}
    //               checked={field.value}
    //               onChange={(event) => {
    //                 field.onChange(event.target.checked);
    //               }}
    //             />
    //           }
    //         />
    //       )}
    //     /> */}
    //       <Controller
    //         control={control}
    //         name="organization_id"
    //         rules={{ required: 'This field is required' }}
    //         // eslint-disable-next-line
    //         defaultValue={null as any}
    //         render={({ field }) => (
    //           <Autocomplete
    //             {...organizationAutocompleteProps}
    //             {...field}
    //             onChange={(_, value) => {
    //               field.onChange(value);
    //             }}
    //             getOptionLabel={(item) => {
    //               //console.log(item);
    //               return (
    //                 organizationAutocompleteProps?.options?.find(
    //                   (p) => p.id === item.id
    //                 )?.name ?? ''
    //               );
    //             }}
    //             isOptionEqualToValue={(option, value) => {
    //               // console.log(value.id);
    //               // console.log(option);
    //               //return option.id === value.id;
    //               return option.id === value.id;
    //             }}
    //             renderInput={(params) => (
    //               <TextField
    //                 {...params}
    //                 label="Organization"
    //                 margin="normal"
    //                 variant="outlined"
    //                 error={!!(errors as any)?.organization?.id}
    //                 helperText={(errors as any)?.organization?.id?.message}
    //                 required
    //               />
    //             )}
    //           />
    //         )}
    //       />
    //       <TextField
    //         {...register('password', {
    //           required: 'This field is required',
    //         })}
    //         error={!!(errors as any)?.patronymic}
    //         helperText={(errors as any)?.patronymic?.message}
    //         margin="normal"
    //         fullWidth
    //         InputLabelProps={{ shrink: true }}
    //         type="password"
    //         label="Password"
    //         name="password"
    //       />
    //     </form>
    //   </Box>
    // </Create>
  );
};
