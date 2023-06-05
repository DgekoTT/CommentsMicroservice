import { Test, TestingModule } from '@nestjs/testing';
import {CommentsController} from "../src/comments/comments.controller";
import {CommentsService} from "../src/comments/comments.service";
import {CommentsDto} from "../src/comments/dto/comments.dto";
import {Comments} from "../src/comments/comments.model";
import { Request } from 'express';
import {UpdateCommentDto} from "../src/comments/dto/updateCommentDto";


describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  describe('getCommentsByFilmId', () => {
    it('should return comments by film ID', async () => {
      const filmId = 1;
      const expectedComments = [
        new Comments({
          displayName: "Vana",
          comment: 'hi',
          filmId: 1,
          parentCommentId: null
        })
      ];
      jest
          .spyOn(commentsService, 'getCommentsByFilmId')
          .mockResolvedValue(expectedComments);

      const result = await commentsController.getCommentsByFilmId(filmId);

      expect(result).toEqual(expectedComments);
      expect(commentsService.getCommentsByFilmId).toHaveBeenCalledWith(filmId);
    });
  });

  describe('createComments', () => {
    it('should create a new comment', async () => {
      const commentsDto: CommentsDto = { displayName: "Vana", comment: 'hi' ,filmId: 1, parentCommentId: 1};
      // @ts-ignore
      const request: Request =  { cookies: { refreshToken: 'sfegwegw35gfg2s' } };

      jest
          .spyOn(commentsService, 'createComment')
          .mockResolvedValue();

      // @ts-ignore
      const result = await commentsController.createComments(commentsDto, request);

      expect(result).toBeUndefined();
      expect(commentsService.createComment).toHaveBeenCalledWith(commentsDto, request.cookies.refreshToken);
    });
  });

  describe('updateComment', () => {
    it('should update an existing comment', async () => {
      const updateCommentDto: UpdateCommentDto = { commentId: 1, comment: 'hi all' };
      const request = { cookies: { refreshToken: 'sfegwegw35gfg2s' } };

      jest
          .spyOn(commentsService, 'updateComment')
          .mockResolvedValue();
      // @ts-ignore
      const result = await commentsController.updateComment(updateCommentDto, request);

      expect(result).toBeUndefined();
      expect(commentsService.updateComment).toHaveBeenCalledWith(updateCommentDto, request.cookies.refreshToken);
    });
  });

  describe('deleteCommentById', () => {
    it('should delete a comment by ID', async () => {
      const commentId = 1;
      const request = { cookies: { refreshToken: 'sfegwegw35gfg2s' } };
      const expectedResult = 'Комментарий удален';

      jest
          .spyOn(commentsService, 'deleteComment')
          .mockResolvedValue(expectedResult);
      // @ts-ignore
      const result = await commentsController.deleteCommentById(commentId, request);

      expect(result).toEqual(expectedResult);
      expect(commentsService.deleteComment).toHaveBeenCalledWith(commentId, request.cookies.refreshToken);
    });
  });
});
