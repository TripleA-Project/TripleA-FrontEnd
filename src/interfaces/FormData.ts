import { type EmailVerifyForm } from '@/components/Form/EmailVerifyForm';
import { type PasswordForm } from '@/components/Form/PasswordForm';
import { type EmailForm } from '@/components/Form/EmailForm';
import { type NameForm } from '@/components/Form/NameForm';
import { type TermsFormData } from '@/components/Form/TermsForm';
import { type ValidatePasswordForm } from '@/components/Form/EditProfileForm/ValidatePasswordForm';
import { type EditProfilesForm } from '@/components/Form/EditProfileForm/EditProfilesForm';

export type FormData = Partial<EmailForm & EmailVerifyForm & PasswordForm & NameForm & TermsFormData>;

export type EditProfileFormData = Partial<ValidatePasswordForm & EditProfilesForm>;
