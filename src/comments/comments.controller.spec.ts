import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments } from './comments.model';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import { Request } from 'express';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  beforeEach(() => {
    commentsService = new CommentsService();
    commentsController = new CommentsController(commentsService);
  });

  describe('getCommentsByFilmId', () => {
    it('should return comments for a film by its id', () => {
      const filmId = 1;
      const expectedComments: Comments[] = []; // Add expected comments here

      jest.spyOn(commentsService, 'getCommentsByFilmId').mockReturnValue(expectedComments);

      const result = commentsController.getCommentsByFilmId(filmId);

      expect(result).toBe(expectedComments);
      expect(commentsService.getCommentsByFilmId).toHaveBeenCalledWith(filmId);
    });
  });

  describe('createComments', () => {
    it('should create a new comment', () => {
      const commentsDto: CommentsDto = {
        displayName: 'Maki',
        comment: 'Какой-то текст',
        filmId: 123,
        parentCommentId: null,
      };
      const request: Partial<Request> = {
        cookies: {
          refreshToken: 'token',
        },
      };

      jest.spyOn(commentsService, 'createComment').mockReturnValue('success');

      const result = commentsController.createComments(commentsDto, request as Request);

      expect(result).toBe('success');
      expect(commentsService.createComment).toHaveBeenCalledWith(commentsDto, request.cookies.refreshToken);
    });
  });

  describe('updateComment', () => {
    it('should update a comment', () => {
      const updateCommentDto: UpdateCommentDto = {}; // Add update comment DTO here

      jest.spyOn(commentsService, 'updateComment').mockReturnValue('success');

      const result = commentsController.updateComment(updateCommentDto);

      expect(result).toBe('success');
      expect(commentsService.updateComment).toHaveBeenCalledWith(updateCommentDto);
    });
  });

  describe('deleteCommentById', () => {
    it('should delete a comment by its id', () => {
      const commentId = 1;

      jest.spyOn(commentsService, 'deleteComment').mockReturnValue('success');

      const result = commentsController.deleteCommentById(commentId);

      expect(result).toBe('success');
      expect(commentsService.deleteComment).toHaveBeenCalledWith(commentId);
    });
  });
});