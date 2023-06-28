import { EmailFormData } from '@/components/Form/EmailForm';
import { LoginForm } from '@/components/Form/LoginForm';
import { PasswordFormData } from '@/components/Form/PasswordForm';
import { SignupForm } from '@/components/Form/SignupForm';
import { TermsFormFormData } from '@/components/Form/TermsForm';

export type FormData = Partial<EmailFormData & SignupForm & LoginForm & PasswordFormData & TermsFormFormData>;
