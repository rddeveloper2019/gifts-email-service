import { Gift } from "../gifts/entities/gift.entity";
export enum Links {
  GIFTS = "gifts",
  MAILINGS = "mailings",
}

export interface GiftFormProps {
  method: string;
  title: string;
  button: string;
}

export interface MailningProps {
  method: string;
  title: string;
  button: string;
}

export interface NavBarProps {
  options?: Record<Links, boolean>;
}

export interface SignInProps {
  pageTitle: string;
}

export interface SignUpProps {
  pageTitle: string;
}
export interface GiftsPageProps {
  roomId: string;
  gifts: Gift[];
}
