export type UserType = {
  email: string;
  id: string;
  locale: string;
  name: string;
  organization: {
    id: string;
    logo: string;
    name: string;
    portalUrl: string;
    taxNumber: string;
  };
  role: string;
};
