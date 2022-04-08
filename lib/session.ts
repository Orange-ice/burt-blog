import {withIronSessionApiRoute, withIronSessionSsr} from 'iron-session/next';
import type {NextApiHandler, GetServerSideProps} from 'next';
import type {IronSessionOptions} from 'iron-session';

const password = '0gyprto1dt7hhe8hyof8pxo522xgghti';

const sessionOptions: IronSessionOptions = {
  password,
  cookieName: 'session-burt',
  cookieOptions: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  },
};

export const withSessionApi = (handle: NextApiHandler) => {
  return withIronSessionApiRoute(handle, sessionOptions);
};


export const withSessionSsr = (handle: GetServerSideProps) => {
  return withIronSessionSsr(handle, sessionOptions);
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: { id: number, email: string };
  }
}