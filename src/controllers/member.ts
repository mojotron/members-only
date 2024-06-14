import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user';

const getMember = (req: Request, res: Response) => {
  const { isMember } = req.user as { isMember: boolean };

  if (isMember) return res.redirect('/dashboard');
  return res.status(StatusCodes.OK).render('pages/become-member');
};

const postMember = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { isMember, userId } = req.user as {
        isMember: boolean;
        userId: string;
      };
      if (isMember) return res.redirect('/dashboard');

      const { memberCode } = req.body;

      const correctCode = memberCode === process.env.MEMBER_CODE;

      if (correctCode) {
        await User.findByIdAndUpdate(userId, { isMember: true }, { new: true });

        return res
          .status(StatusCodes.OK)
          .render('pages/confirm-member', { correctCode });
      }

      return res
        .status(StatusCodes.OK)
        .render('pages/confirm-member', { correctCode });
    } catch (error) {
      return next(error);
    }
  },
);

export { getMember, postMember };
