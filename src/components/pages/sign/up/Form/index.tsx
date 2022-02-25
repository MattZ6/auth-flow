import { MdMailOutline, MdOutlinePersonOutline } from 'react-icons/md';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTranslation } from '@hooks/useTranslation';

import { FormField, PasswordFormField, FormButton } from '@components/Form';

import { focusFirstInputWithError } from '@utils/focusFirstInputWithError';

import { FormStyles as Styles } from './styles';
import { useEffect } from 'react';
import { setFocusOnInput } from '@utils/setFocusOnInput';

const nameFormFieldName = 'name';
const emailFormFieldName = 'email';
const passwordFormFieldName = 'password';

export function SignUpForm() {
  const t = useTranslation('sign-up');

  const schema = yup.object().shape({
    [nameFormFieldName]: yup.string().trim()
      .required(t('errors.name.required'))
      .min(3, t('errors.name.min', { count: 3 })),
    [emailFormFieldName]: yup.string()
      .required(t('errors.email.required'))
      .email(t('errors.email.invalid')),
    [passwordFormFieldName]: yup.string()
      .required(t('errors.password.required'))
      .min(6, t('errors.password.min', { count: 6 }))
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const signUp: SubmitHandler<any> = async (data) => {
    try {

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    setFocusOnInput(nameFormFieldName);
  }, []);

  return (
    <Styles.Form onSubmit={handleSubmit(signUp, focusFirstInputWithError)}>
      <FormField
        label={t('form.name.label')}
        placeholder={t('form.name.placeholder')}
        icon={MdOutlinePersonOutline}
        error={formState.errors[nameFormFieldName]}
        disabled={formState.isSubmitting}
        { ...register(nameFormFieldName) }
      />

      <FormField
        label={t('form.email.label')}
        placeholder={t('form.email.placeholder')}
        type="email"
        icon={MdMailOutline}
        error={formState.errors[emailFormFieldName]}
        disabled={formState.isSubmitting}
        { ...register(emailFormFieldName) }
      />

      <PasswordFormField
        label={t('form.password.label')}
        placeholder={t('form.password.placeholder')}
        error={formState.errors[passwordFormFieldName]}
        disabled={formState.isSubmitting}
        { ...register(passwordFormFieldName) }
      />

      <Styles.Actions>
        <FormButton type="submit">
          {t('form.submit')}
        </FormButton>
      </Styles.Actions>
    </Styles.Form>
  );
}