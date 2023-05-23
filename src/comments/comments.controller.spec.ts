import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments } from './comments.model';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import { Request } from 'express';
import {Test, TestingModule} from "@nestjs/testing";
import {JwtService} from "@nestjs/jwt";

describe('check CommentsController', () => {
  let commentsController: CommentsController;
  const mockCommentService = {
      getCommentsByFilmId: jest.fn((filmId) => {
          return [{displayName: 'Peter', comment: 'Какой - то текст',
            filmId: 1, parentCommentId: 2}]
      }),

      createComment: jest.fn(),

      updateComment: jest.fn(),

      deleteComment: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        CommentsService,
        JwtService
      ]

    })
        .overrideProvider(CommentsService)
        .useValue(mockCommentService)
        .compile();

    commentsController = module.get<CommentsController>(CommentsController)
  });

  it('should be defined', () => {
    expect(commentsController).toBeDefined();
  });

  describe('getCommentsByFilmId', () => {
    it('should return comments for a film by its id', () => {
      expect(commentsController.getCommentsByFilmId(1)).toEqual(
        [{displayName: 'Peter', comment: 'Какой - то текст',
          filmId: 1, parentCommentId: 2}]
      );
    });
  });
  //
  // describe('createComments', () => {
  //   it('should create a new comment', () => {
  //     const commentsDto: CommentsDto = {
  //       displayName: 'Maki',
  //       comment: 'Какой-то текст',
  //       filmId: 123,
  //       parentCommentId: null,
  //     };
  //     const request: Partial<Request> = {
  //       cookies: {
  //         refreshToken: 'token',
  //       },
  //     };
  //
  //     jest.spyOn(commentsService, 'createComment').mockReturnValue('success');
  //
  //     const result = commentsController.createComments(commentsDto, request as Request);
  //
  //     expect(result).toBe('success');
  //     expect(commentsService.createComment).toHaveBeenCalledWith(commentsDto, request.cookies.refreshToken);
  //   });
  // });
  //
  // describe('updateComment', () => {
  //   it('should update a comment', () => {
  //     const updateCommentDto: UpdateCommentDto = {}; // Add update comment DTO here
  //
  //     jest.spyOn(commentsService, 'updateComment').mockReturnValue('success');
  //
  //     const result = commentsController.updateComment(updateCommentDto);
  //
  //     expect(result).toBe('success');
  //     expect(commentsService.updateComment).toHaveBeenCalledWith(updateCommentDto);
  //   });
  // });
  //
  // describe('deleteCommentById', () => {
  //   it('should delete a comment by its id', () => {
  //     const commentId = 1;
  //
  //     jest.spyOn(commentsService, 'deleteComment').mockReturnValue('success');
  //
  //     const result = commentsController.deleteCommentById(commentId);
  //
  //     expect(result).toBe('success');
  //     expect(commentsService.deleteComment).toHaveBeenCalledWith(commentId);
  //   });
  // });
});