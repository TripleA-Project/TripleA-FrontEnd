import { EmailFormData } from '@/components/Form/EmailForm';
import { LoginForm } from '@/components/Form/LoginForm';
import { PasswordFormData } from '@/components/Form/PasswordForm';
import { SignupForm } from '@/components/Form/SignupForm';
import { TermsFormData } from '@/components/Form/TermsForm';
import { FullNameFormData } from '@/components/Form/fullNameForm';

export type FormData = Partial<
  EmailFormData & FullNameFormData & SignupForm & LoginForm & PasswordFormData & TermsFormData
>;
