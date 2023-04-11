import { Prisma, Review } from '@prisma/client';
import { prisma } from '../../infrastructure/server/util/prisma';

export const createReview = async (input: Prisma.ReviewCreateInput) => {
  return (await prisma.review.create({
    data: input,
  })) as Review;
};

export const findReview = async (
  where: Partial<Prisma.ReviewWhereInput>,
  select?: Prisma.ReviewSelect,
) => {
  return (await prisma.review.findFirst({
    where,
    select,
  })) as Review;
};

export const findUniqueReview = async (
  where: Prisma.ReviewWhereUniqueInput,
  select?: Prisma.ReviewSelect,
) => {
  return (await prisma.review.findUnique({
    where,
    select,
  })) as Review;
};

export const findAllReviews = async ({
  page,
  limit,
  select,
}: {
  page: number;
  limit: number;
  select?: Prisma.ReviewSelect;
}) => {
  const take = limit || 10;
  const skip = (page - 1) * limit;
  return (await prisma.review.findMany({
    select,
    skip,
    take,
  })) as Review[];
};

export const updateReview = async (
  where: Partial<Prisma.ReviewWhereUniqueInput>,
  data: Prisma.ReviewUpdateInput,
  select?: Prisma.ReviewSelect,
) => {
  return (await prisma.review.update({ where, data, select })) as Review;
};

export const deleteReview = async (where: Prisma.ReviewWhereUniqueInput) => {
  return await prisma.review.delete({ where });
};
