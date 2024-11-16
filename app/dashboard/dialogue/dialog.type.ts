import { Level } from "@prisma/client";

export type Dialogues = {
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
  id: string;
  userId: string;
  title: string;
  content: string;
  language: string;
  vocabulary: string;
  level: Level;
  access: string;
  createdAt: Date;
  imageCover: string;
}[];

export type Dialog = {
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
  id: string;
  userId: string;
  title: string;
  content: string;
  language: string;
  vocabulary: string;
  level: Level;
  access: string;
  createdAt: Date;
  imageCover: string;
};
